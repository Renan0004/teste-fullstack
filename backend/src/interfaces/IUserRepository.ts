import { User } from '../models/User';

// Interface para o repositório de usuários
export interface IUserRepository {
  findByCode(code: string): Promise<User | null>;
  create(code: string): Promise<User>;
  createIfNotExists(code: string): Promise<User>;
} 