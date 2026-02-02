import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  //Our Custom Repository inherits all TypeORM built-in Repository Methods

  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager()); //Without createEntityManager(), the repository cannot talk to the database.
  }

  async findByEmail(email: string, withPassword = false): Promise<User | null> {
    return this.findOne({
      where: { email },
      select: withPassword ? { id: true, email: true, password: true } : { id: true, email: true },
    });
  }

  async findById(id: string, withPassword = false): Promise<User | null> {

    if (withPassword) {
      return this.createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.id = :id', { id })
        .getOne();
    }
    
    return this.findOne({
      where: { id },
      select: { id: true, email: true },
    });
  }

  async updateById(id: string, data: Partial<User> ): Promise<User | null> {
    const user = await this.findOne({ where: { id } });
    if (!user) return null;
    Object.assign(user, data);
    return this.save(user);

  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.create(data);
    return this.save(user);
  }
}
