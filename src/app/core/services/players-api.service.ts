import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { ApiConfigService } from './api-config.service';

@Injectable({ providedIn: 'root' })
export class PlayersApiService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiConfigService);

  list(): Observable<readonly Player[]> {
    return this.http.get<readonly Player[]>(this.api.endpoint('players'));
  }
}
