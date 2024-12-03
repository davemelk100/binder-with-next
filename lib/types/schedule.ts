export interface ScheduleEvent {
  id: string;
  content: string;
  day: string;
  timeSlot: string;
}

export interface ScheduleState {
  events: Record<string, ScheduleEvent>;
}