import { User } from '../models/User';

export interface IUserRepository {
  findByCode(code: string): Promise<User | null>;
  create(code: string): Promise<User>;
  createIfNotExists(code: string): Promise<User>;
} 