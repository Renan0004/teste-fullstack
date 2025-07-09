import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { IUserRepository } from '../interfaces/IUserRepository';

class UserRepositoryImpl implements IUserRepository {
  private repository = AppDataSource.getRepository(User);

  async findByCode(code: string): Promise<User | null> {
    return this.repository.findOne({ where: { code } });
  }

  async create(code: string): Promise<User> {
    const user = this.repository.create({ code });
    return this.repository.save(user);
  }

  async createIfNotExists(code: string): Promise<User> {
    let user = await this.findByCode(code);
    
    if (!user) {
      user = await this.create(code);
    }
    
    return user;
  }
}

export const UserRepository: IUserRepository = new UserRepositoryImpl(); 