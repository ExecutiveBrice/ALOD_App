import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { AdherentApplicationService } from './services/adherent-application.service';

@Component({
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, EmptyStateComponent, JsonPipe],
  template: `<ion-header><ion-toolbar><ion-title>Mon profil</ion-title></ion-toolbar></ion-header><ion-content>@if (adherent()) { <pre class="ion-padding">{{ adherent() | json }}</pre> } @else { <app-empty-state icon="person-circle-outline" title="Profil à connecter" description="Utilisez /profile/:adherentId pour charger un adhérent depuis l’API."></app-empty-state> }</ion-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private readonly route = inject(ActivatedRoute);
  private readonly adherentService = inject(AdherentApplicationService);

  readonly adherent = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('adherentId'))),
      filter((adherentId): adherentId is number => Number.isFinite(adherentId)),
      switchMap((adherentId) => this.adherentService.getById(adherentId)),
    ),
    { initialValue: null },
  );
}
