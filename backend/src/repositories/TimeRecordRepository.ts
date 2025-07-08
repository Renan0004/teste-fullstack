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
    // Busca todos os registros, incluindo os que estão em andamento
    // Modificamos para remover a condição de exit_time não ser nulo
    return this.find({
      where: {
        user_id: userId,
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
    
    // Calcula a diferença em milissegundos
    const diffMs = exitTime.getTime() - entryTime.getTime();
    
    // Calcula a diferença em segundos (total)
    const totalSeconds = Math.floor(diffMs / 1000);
    
    // Calcula a diferença em minutos
    const diffMinutes = Math.floor(totalSeconds / 60);
    
    // Armazena os segundos restantes (após remover os minutos completos)
    const remainingSeconds = totalSeconds % 60;
    
    timeRecord.exit_time = exitTime;
    timeRecord.total_minutes = diffMinutes;
    timeRecord.total_seconds = remainingSeconds;
    
    return this.save(timeRecord);
  }
}); 