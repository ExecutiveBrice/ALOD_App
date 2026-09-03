export type AttendanceStatus = 'pending' | 'present' | 'absent' | 'late';

export interface Attendance {
  id: string;
  eventId: string;
  playerId: string;
  status: AttendanceStatus;
  note?: string;
  updatedAt: string;
}

export interface UpdateAttendanceRequest {
  status: AttendanceStatus;
  note?: string;
}
