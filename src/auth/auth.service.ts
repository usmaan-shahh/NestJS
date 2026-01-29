import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { EmailAlreadyExistsError } from '../common/exceptions/user/email-already-exists.exception';


@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}

    async register(dto: RegisterDto) {

    const { email, password } = dto;

    const existing = await this.userService.findByEmail(email);

    if (existing) throw new EmailAlreadyExistsError();

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userService.createUser({email, password: hashedPassword});
     
    return {message: 'You are successfully registered'};

}}
