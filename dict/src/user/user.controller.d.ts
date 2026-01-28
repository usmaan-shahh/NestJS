import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        password: string;
    }): Promise<{
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        id: number;
    }>;
}
