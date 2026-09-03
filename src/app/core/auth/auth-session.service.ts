import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  readonly accessToken = signal<string | null>(null);
  readonly isAuthenticated = signal(false);

  setAccessToken(token: string | null): void {
    this.accessToken.set(token);
    this.isAuthenticated.set(token !== null);
  }
}
