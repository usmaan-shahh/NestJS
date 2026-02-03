import * as bcrypt from 'bcrypt';
import { User } from '../users-entity';
import { InvalidPasswordException } from 'src/core/shared/shared-exceptions/InvalidPasswordException';
import { SamePasswordException } from 'src/core/shared/shared-exceptions/SamePasswordException';


export async function validatePasswordForUpdate(
  user: User & { password: string },
  currentPassword: string | undefined,
  newPassword: string | undefined,
): Promise<string> {

  if (!currentPassword || !newPassword) throw new InvalidPasswordException();

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) throw new InvalidPasswordException();

  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) throw new SamePasswordException();

  return bcrypt.hash(newPassword, 10);
  
}
