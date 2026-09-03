import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { SecureStorage } from '@aparajita/capacitor-secure-storage';
import { Observable, from, map, shareReplay, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AUTH_RETRY, SKIP_AUTH, SKIP_AUTH_ERROR_HANDLING } from './auth-http.context';
import { AuthTokens, LoginCredentials } from './auth.config';

const SESSION_STORAGE_KEY = 'alod.auth.session';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private refreshRequest?: Observable<string>;

  readonly accessToken = signal<string | null>(null);
  readonly refreshToken = signal<string | null>(null);
  readonly initialized = signal(false);
  readonly isAuthenticated = computed(() => this.accessToken() !== null);

  async restoreSession(): Promise<void> {
    try {
      const serialized = await this.readSession();
      if (serialized) this.applyTokens(this.parseTokens(serialized));
    } catch {
      await this.clearPersistedSession();
    } finally {
      this.initialized.set(true);
    }
  }

  login(credentials: LoginCredentials): Observable<void> {
    const config = environment.auth;
    const body: Record<string, string> = {
      [config.usernameField]: credentials.username,
      [config.passwordField]: credentials.password,
    };

    return this.http.post<unknown>(this.endpoint(config.loginPath), body, {
      context: this.authContext(),
    }).pipe(
      map((response) => this.tokensFrom(response)),
      switchMap((tokens) => from(this.persistAndApply(tokens))),
    );
  }

  /** Renouvelle un access token une seule fois pour toutes les requêtes 401 concurrentes. */
  refreshAccessToken(): Observable<string> {
    if (this.refreshRequest) return this.refreshRequest;

    const config = environment.auth;
    const refreshToken = this.refreshToken();
    if (!config.refreshPath || !refreshToken) {
      return throwError(() => new Error('Aucun renouvellement de session disponible.'));
    }

    this.refreshRequest = this.http.post<unknown>(this.endpoint(config.refreshPath), {
      [config.refreshRequestField]: refreshToken,
    }, { context: this.authContext() }).pipe(
      map((response) => this.tokensFrom(response, refreshToken)),
      switchMap((tokens) => from(this.persistAndApply(tokens)).pipe(map(() => tokens.accessToken))),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    this.refreshRequest.subscribe({
      complete: () => this.refreshRequest = undefined,
      error: () => this.refreshRequest = undefined,
    });
    return this.refreshRequest;
  }

  async logout(): Promise<void> {
    await this.clearPersistedSession();
    await this.router.navigate(['/login']);
  }

  expireSession(returnUrl?: string): void {
    void this.clearPersistedSession();
    void this.router.navigate(['/login'], {
      queryParams: returnUrl ? { returnUrl } : undefined,
    });
  }

  private authContext(): HttpContext {
    return new HttpContext()
      .set(SKIP_AUTH, true)
      .set(SKIP_AUTH_ERROR_HANDLING, true)
      .set(AUTH_RETRY, true);
  }

  private endpoint(path: string): string {
    return /^https?:\/\//i.test(path) ? path : `${environment.apiUrl}${path}`;
  }

  private async persistAndApply(tokens: AuthTokens): Promise<void> {
    await this.writeSession(JSON.stringify(tokens));
    this.applyTokens(tokens);
  }

  private applyTokens(tokens: AuthTokens): void {
    this.accessToken.set(tokens.accessToken);
    this.refreshToken.set(tokens.refreshToken ?? null);
  }

  private tokensFrom(response: unknown, fallbackRefreshToken?: string): AuthTokens {
    if (!response || typeof response !== 'object') {
      throw new Error('Réponse d’authentification invalide.');
    }
    const payload = response as Record<string, unknown>;
    const accessToken = this.firstString(payload, [
      environment.auth.accessTokenField,
      'accessToken',
      'access_token',
      'token',
    ]);
    const refreshTokenField = environment.auth.refreshTokenField;
    const refreshToken = refreshTokenField
      ? this.firstString(payload, [refreshTokenField, 'refresh_token'])
      : undefined;
    if (!accessToken) {
      throw new Error(`Le champ ${environment.auth.accessTokenField} est absent de la réponse d’authentification.`);
    }
    return {
      accessToken,
      refreshToken: refreshToken ?? fallbackRefreshToken,
    };
  }

  private firstString(payload: Record<string, unknown>, fields: string[]): string | undefined {
    for (const field of fields) {
      const value = payload[field];
      if (typeof value === 'string' && value) return value;
    }
    return undefined;
  }

  private parseTokens(serialized: string): AuthTokens {
    return this.tokensFrom(JSON.parse(serialized));
  }

  private async readSession(): Promise<string | null> {
    if (Capacitor.isNativePlatform()) return SecureStorage.getItem(SESSION_STORAGE_KEY);
    return localStorage.getItem(SESSION_STORAGE_KEY);
  }

  private async writeSession(serialized: string): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await SecureStorage.setItem(SESSION_STORAGE_KEY, serialized);
      return;
    }
    localStorage.setItem(SESSION_STORAGE_KEY, serialized);
  }

  private async clearPersistedSession(): Promise<void> {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    if (Capacitor.isNativePlatform()) {
      await SecureStorage.removeItem(SESSION_STORAGE_KEY);
      return;
    }
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
}
