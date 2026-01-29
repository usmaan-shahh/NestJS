import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> { //Our Custom Repository inherits all TypeORM built-in Repository Methods

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager()); //Without createEntityManager(), the repository cannot talk to the database.     
  }

  async findByEmail(email: string): Promise< User | null > {
      return this.findOne({
        where: { email },
      });
  }

  async createUser(data: Partial<User>): Promise<User> {
      const user = this.create(data);
      return this.save(user);
  }

}
