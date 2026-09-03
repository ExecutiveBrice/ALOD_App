import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, EmptyStateComponent],
  template: `<ion-header><ion-toolbar><ion-title>Événements</ion-title></ion-toolbar></ion-header><ion-content><app-empty-state icon="calendar-outline" title="Aucun événement affiché" description="Connectez votre API REST pour charger les entraînements et les matchs."></app-empty-state></ion-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {}
