import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-empty-state',
  imports: [IonIcon],
  template: `
    <section class="empty-state">
      <ion-icon [name]="icon()" aria-hidden="true"></ion-icon>
      <h2>{{ title() }}</h2>
      <p>{{ description() }}</p>
    </section>
  `,
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  readonly icon = input('calendar-outline');
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
