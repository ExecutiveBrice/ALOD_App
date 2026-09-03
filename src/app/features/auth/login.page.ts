import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { finalize } from 'rxjs';
import { AuthSessionService } from '../../core/auth/auth-session.service';

@Component({
  imports: [
    ReactiveFormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonText,
    IonTitle,
    IonToolbar,
  ],
  template: `
    <ion-header>
      <ion-toolbar><ion-title>Connexion</ion-title></ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <main class="login-page">
        <section aria-labelledby="login-title">
          <h1 id="login-title">Bienvenue</h1>
          <p>Connectez-vous pour accéder aux présences de votre équipe.</p>

          <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <ion-item>
              <ion-input
                label="Identifiant"
                labelPlacement="stacked"
                formControlName="username"
                autocomplete="username"
                inputmode="email"
                required
              />
            </ion-item>
            <ion-item>
              <ion-input
                label="Mot de passe"
                labelPlacement="stacked"
                formControlName="password"
                type="password"
                autocomplete="current-password"
                required
              />
            </ion-item>

            @if (errorMessage()) {
              <ion-text color="danger" role="alert"><p>{{ errorMessage() }}</p></ion-text>
            }

            <ion-button type="submit" expand="block" [disabled]="submitting()">
              {{ submitting() ? 'Connexion…' : 'Se connecter' }}
            </ion-button>
          </form>
        </section>
      </main>
    </ion-content>
  `,
  styles: `
    .login-page { display: grid; min-height: 100%; place-items: center; }
    section { width: min(100%, 28rem); }
    h1 { margin-bottom: .25rem; }
    p { color: var(--ion-color-medium-shade); line-height: 1.5; }
    form { display: grid; gap: .75rem; margin-top: 2rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authSession = inject(AuthSessionService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly submitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid || this.submitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.submitting.set(true);
    this.authSession.login(this.form.getRawValue()).pipe(
      finalize(() => this.submitting.set(false)),
    ).subscribe({
      next: () => void this.router.navigateByUrl(this.returnUrl()),
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(error.status === 401 || error.status === 403
          ? 'Identifiant ou mot de passe incorrect.'
          : 'La connexion est indisponible. Réessayez dans quelques instants.');
      },
    });
  }

  private returnUrl(): string {
    const candidate = this.route.snapshot.queryParamMap.get('returnUrl');
    return candidate?.startsWith('/') && !candidate.startsWith('//') ? candidate : '/home';
  }
}
