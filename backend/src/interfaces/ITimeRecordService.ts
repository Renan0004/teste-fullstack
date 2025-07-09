import { TimeRecord } from '../models/TimeRecord';

export interface ITimeRecordService {
  getCurrentTimeRecord(userCode: string): Promise<TimeRecord | null>;
  getPreviousTimeRecords(userCode: string): Promise<TimeRecord[]>;
  registerEntry(userCode: string): Promise<TimeRecord | null>;
  registerExit(userCode: string): Promise<TimeRecord | null>;
  calculateWorkedHours(timeRecord: TimeRecord): { hours: number; minutes: number; seconds: number };
} 