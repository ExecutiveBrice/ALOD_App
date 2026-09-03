import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, EmptyStateComponent],
  template: `<ion-header><ion-toolbar><ion-title>Mon profil</ion-title></ion-toolbar></ion-header><ion-content><app-empty-state icon="person-circle-outline" title="Profil à connecter" description="L’authentification sera branchée à votre API REST existante."></app-empty-state></ion-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {}
