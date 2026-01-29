import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/user.repository';
import { RegisterDto } from './dto/register.dto';
import { EmailAlreadyExistsError } from '../common/exceptions/user/email-already-exists.exception';


@Injectable()
export class AuthService {

  constructor(private readonly userRepository: UserRepository) {}

    async register(dto: RegisterDto) {

    const { email, password } = dto;

    const existing = await this.userRepository.findByEmail(email);

    if (existing) throw new EmailAlreadyExistsError();

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.createUser({email, password: hashedPassword});
     
    return {message: 'You are successfully registered'};

}}
