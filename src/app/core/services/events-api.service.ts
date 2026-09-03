import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamEvent } from '../models/event.model';
import { ApiConfigService } from './api-config.service';

@Injectable({ providedIn: 'root' })
export class EventsApiService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiConfigService);

  list(): Observable<readonly TeamEvent[]> {
    return this.http.get<readonly TeamEvent[]>(this.api.endpoint('events'));
  }

  getById(eventId: string): Observable<TeamEvent> {
    return this.http.get<TeamEvent>(this.api.endpoint(`events/${eventId}`));
  }
}
