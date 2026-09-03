import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, EmptyStateComponent],
  template: `<ion-header><ion-toolbar><ion-title>Effectif</ion-title></ion-toolbar></ion-header><ion-content><app-empty-state icon="people-outline" title="Aucun joueur affiché" description="L’effectif sera fourni par votre API REST."></app-empty-state></ion-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersPage {}
