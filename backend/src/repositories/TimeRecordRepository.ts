import { Between, LessThan, Not, IsNull } from 'typeorm';
import { AppDataSource } from '../config/database';
import { TimeRecord } from '../models/TimeRecord';

export const TimeRecordRepository = AppDataSource.getRepository(TimeRecord).extend({
  async findCurrentDayRecord(userId: string): Promise<TimeRecord | null> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return this.findOne({
      where: {
        user_id: userId,
        entry_time: Between(today, tomorrow)
      },
      order: {
        entry_time: 'DESC'
      }
    });
  },
  
  async findPreviousRecords(userId: string, limit: number = 10): Promise<TimeRecord[]> {
    // Busca registros completos (com data de saída)
    return this.find({
      where: {
        user_id: userId,
        exit_time: Not(IsNull())
      },
      order: {
        entry_time: 'DESC'
      },
      take: limit
    });
  },
  
  async createEntry(userId: string): Promise<TimeRecord> {
    const timeRecord = this.create({
      user_id: userId,
      entry_time: new Date()
    });
    
    return this.save(timeRecord);
  },
  
  async registerExit(id: string): Promise<TimeRecord | null> {
    const timeRecord = await this.findOne({ where: { id } });
    
    if (!timeRecord || timeRecord.exit_time) {
      return null;
    }
    
    const exitTime = new Date();
    const entryTime = new Date(timeRecord.entry_time);
    
    // Calcula a diferença em minutos
    const diffMinutes = Math.floor((exitTime.getTime() - entryTime.getTime()) / (1000 * 60));
    
    timeRecord.exit_time = exitTime;
    timeRecord.total_minutes = diffMinutes;
    
    return this.save(timeRecord);
  }
}); 