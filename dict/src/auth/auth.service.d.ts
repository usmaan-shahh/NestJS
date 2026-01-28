import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(email: string, password: string): Promise<{
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        id: number;
    }>;
}
