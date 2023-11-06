import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategey } from './strategy/accessToken.strategey';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';
import { UsersModule } from '../users/users.module';
import { RefreshTokenModule } from '../refresh token/refreshtoken.module';
import { CodeModule } from '../code/code.module';

@Module({
    imports: [PassportModule, JwtModule.register({}), UsersModule, RefreshTokenModule, CodeModule],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategey, RefreshTokenStrategy],
})
export class AuthModule {}
