import {  Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { EmailAlreadyExistsException } from 'src/utils/exceptions/EmailAlreadyExistsException';
import { InvalidPasswordException } from 'src/utils/exceptions/InvalidPasswordException';
import * as bcrypt from 'bcrypt';
import { SamePasswordException } from 'src/utils/exceptions/SamePasswordException';
import { UserNotFoundException } from 'src/utils/exceptions/UserNotFoundException';
import { NothingToUpdateException } from 'src/utils/exceptions/NothingToUpdateException';
import { UpdateProfilePayload } from 'src/utils/interface/update-profile.interface';


@Injectable()
export class UserService {
  
  constructor(private readonly userRepository: UserRepository) {}

   async fetchUser(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
   }

    async updateProfile( id: string, payload: UpdateProfilePayload ): Promise <User | null> {

    const { email, currentPassword, newPassword } = payload;

    const user = await this.userRepository.findById(id);

    if (!user) throw new UserNotFoundException();

    const updateData: Partial<User> = {};

    if (email) {

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser && existingUser.id !== id) throw new EmailAlreadyExistsException();

    updateData.email = email;
      
    }

    const wantsPasswordUpdate = currentPassword !== undefined || newPassword !== undefined; 

    if (wantsPasswordUpdate) {   
      if ( !currentPassword || !newPassword ) throw new InvalidPasswordException();
    
      const userWithPassword = await this.userRepository.findById(id, true);
      if (!userWithPassword) throw new UserNotFoundException();
    
      const isPasswordValid = await bcrypt.compare(currentPassword, userWithPassword.password);
      if (!isPasswordValid) throw new InvalidPasswordException();
    
      const isSamePassword = await bcrypt.compare(newPassword, userWithPassword.password);
      if (isSamePassword) throw new SamePasswordException();
    
      updateData.password = await bcrypt.hash(newPassword, 10);
    }
    if (Object.keys(updateData).length === 0) throw new NothingToUpdateException();

    const updatedUser = await this.userRepository.updateById(id, updateData);
    if (!updatedUser) throw new UserNotFoundException();

    return updatedUser;

  }

}



 



