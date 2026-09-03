import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { AuthSessionService } from '../../core/auth/auth-session.service';

@Component({
  imports: [IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly authSession = inject(AuthSessionService);
  readonly selectedPeriod = signal<'week' | 'month'>('week');
  readonly periodLabel = computed(() => this.selectedPeriod() === 'week' ? 'cette semaine' : 'ce mois');

  selectPeriod(period: 'week' | 'month'): void {
    this.selectedPeriod.set(period);
  }

  logout(): void {
    void this.authSession.logout();
  }
}
