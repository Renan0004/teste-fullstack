import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity('time_records')
export class TimeRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  entry_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  exit_time: Date;

  @Column({ type: 'int', nullable: true })
  total_minutes: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.timeRecords)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;
} 