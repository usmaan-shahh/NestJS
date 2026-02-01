import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
     return this.userRepository.findByEmail(email);
  }
  async findById(id: string): Promise<User | null> {
     return this.userRepository.findById(id);
  }

  

}
