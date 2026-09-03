import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance, UpdateAttendanceRequest } from '../models/attendance.model';
import { ApiConfigService } from './api-config.service';

@Injectable({ providedIn: 'root' })
export class AttendanceApiService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiConfigService);

  listForEvent(eventId: string): Observable<readonly Attendance[]> {
    return this.http.get<readonly Attendance[]>(this.api.endpoint(`events/${eventId}/attendance`));
  }

  update(attendanceId: string, body: UpdateAttendanceRequest): Observable<Attendance> {
    return this.http.patch<Attendance>(this.api.endpoint(`attendance/${attendanceId}`), body);
  }
}
