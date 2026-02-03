import { UserRepository } from '../users-repository';
import { EmailAlreadyExistsException } from 'src/core/shared/auth-exceptions/email-already-exists.exception';

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
