import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserNotFoundException } from 'src/utils/exceptions/UserNotFoundException';
import { NothingToUpdateException } from 'src/utils/exceptions/NothingToUpdateException';
import {
  UpdateProfilePayload,
  UpdateProfileResult,
} from 'src/utils/interface/update-profile.interface';
import { validateEmailForUpdate } from './validators/validate-email';
import { validatePasswordForUpdate } from './validators/validate-password';

function buildUpdateSuccessMessage(updated: {
  email?: boolean;
  password?: boolean;
}): string {
  const parts: string[] = [];
  if (updated.email) parts.push('Email successfully updated');
  if (updated.password) parts.push('Password successfully changed');
  return parts.join('. ');
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async fetchUser(userId: string): Promise<User | null> {
    return this.userRepository.findById(userId);
  }

  async updateProfile(id: string, payload: UpdateProfilePayload):Promise <UpdateProfileResult>{
    
    const { email, currentPassword, newPassword } = payload;

    const isUpdatingPassword = currentPassword !== undefined || newPassword !== undefined;

    const user = await this.userRepository.findById(id, isUpdatingPassword);
    if (!user) throw new UserNotFoundException();

    const updateData: Partial<User> = {};
    const updated: { email?: boolean; password?: boolean } = {};

    if (email) {
      await validateEmailForUpdate(this.userRepository, id, email);
      updateData.email = email; updated.email = true;
    }

    if (isUpdatingPassword) {
      updateData.password = await validatePasswordForUpdate(
        user as User & { password: string },
        currentPassword,
        newPassword,
      );
      updated.password = true;
    }

    if (Object.keys(updateData).length === 0) throw new NothingToUpdateException();

    const savedUser = await this.userRepository.updateById(id, updateData);
    if (!savedUser) throw new UserNotFoundException();

    const message = buildUpdateSuccessMessage(updated);
    return { message };
  }

}
