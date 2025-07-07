import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TimeRecord } from './TimeRecord';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => TimeRecord, timeRecord => timeRecord.user)
  timeRecords: TimeRecord[];
} 