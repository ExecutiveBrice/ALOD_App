export type EventType = 'training' | 'match';

export interface TeamEvent {
  id: string;
  title: string;
  type: EventType;
  startsAt: string;
  location?: string;
  opponent?: string;
}
