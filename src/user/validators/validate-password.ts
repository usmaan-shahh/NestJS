import * as bcrypt from 'bcrypt';
import { User } from '../user.entity';
import { InvalidPasswordException } from 'src/utils/exceptions/InvalidPasswordException';
import { SamePasswordException } from 'src/utils/exceptions/SamePasswordException';

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
