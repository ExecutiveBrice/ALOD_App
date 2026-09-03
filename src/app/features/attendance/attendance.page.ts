import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, EmptyStateComponent],
  template: `<ion-header><ion-toolbar><ion-title>Présences</ion-title></ion-toolbar></ion-header><ion-content><app-empty-state icon="checkmark-circle-outline" title="Choisissez un événement" description="Les feuilles de présence seront chargées depuis votre API REST."></app-empty-state></ion-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendancePage {}
