import { AppDataSource } from '../config/database';
import { User } from '../models/User';

export const UserRepository = AppDataSource.getRepository(User).extend({
  async findByCode(code: string): Promise<User | null> {
    return this.findOne({ where: { code } });
  },

  async createIfNotExists(code: string): Promise<User> {
    let user = await this.findByCode(code);
    
    if (!user) {
      user = this.create({ code });
      await this.save(user);
    }
    
    return user;
  }
}); 