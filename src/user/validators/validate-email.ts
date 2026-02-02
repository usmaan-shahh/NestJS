import { UserRepository } from '../user.repository';
import { EmailAlreadyExistsException } from 'src/shared/shared-exceptions/EmailAlreadyExistsException';

export async function validateEmailForUpdate(
  userRepository: UserRepository,
  id: string,
  email: string,
): Promise<void> {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser && existingUser.id !== id) {
    throw new EmailAlreadyExistsException();
  }
}
