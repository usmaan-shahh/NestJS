import { Injectable } from '@nestjs/common';
import { EmailAlreadyExistsError } from 'src/common/exceptions/user/email-already-exists.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';



@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService) {}

    async register(email: string, password: string) {
        
        const existingUser = await this.prisma.user.findUnique({where: { email }});
    
        if (existingUser) throw new EmailAlreadyExistsError();
        
        const hashedPassword = await bcrypt.hash(password,10);

        const data = {email, password: hashedPassword};

        const selectedFields = {id: true, email: true, role: true, createdAt: true};
    
        return await this.prisma.user.create({data, select: selectedFields});
    
      }
    
}



