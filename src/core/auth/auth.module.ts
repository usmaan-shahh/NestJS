
import { TokensService } from "./jwt/jwt.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { UsersModule } from "src/modules/users/users-module";
import { JwtConfigModule } from "../shared/shared-modules/jwt-config/jwt-config.module";


@Module({
 imports: [UsersModule, JwtConfigModule],
 controllers: [AuthController],
 providers: [AuthService, TokensService],
 exports: [AuthService], 
})

export class AuthModule {}
