import { Injectable } from '@nestjs/common';
import { EmailAlreadyExistsError } from 'src/common/exceptions/user/email-already-exists.exception';
import bcrypt from 'bcrypt';



@Injectable() // Means TypeScript Emits Constructor Parameter Type metadata allowing NestJS to resolve  and inject the PrismaService instance into AuthService.

export class AuthService {

    constructor(private readonly) {}

    
    
}



