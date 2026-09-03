import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdherentControllerApi } from '../../../api/api/adherent-controller.service';
import { AdherentDto } from '../../../api/model/adherent';

/**
 * Couche applicative : les composants Ionic ne dépendent jamais directement
 * du client OpenAPI généré.
 */
@Injectable({ providedIn: 'root' })
export class AdherentApplicationService {
  private readonly adherentApi = inject(AdherentControllerApi);

  getById(adherentId: number): Observable<AdherentDto> {
    return this.adherentApi.getById({ adherentId });
  }
}
