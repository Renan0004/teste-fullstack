export interface TimeRecord {
  id: string;
  entry_time: string;
  exit_time?: string;
  total_minutes?: number;
  created_at: string;
  user_id: string;
}

export interface WorkedHours {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeRecordWithHours extends TimeRecord {
  workedHours: WorkedHours;
} 