import { Module, forwardRef } from '@nestjs/common';
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
    imports: [PassportModule, CodeModule, JwtModule.register({}), forwardRef(() => UsersModule), RefreshTokenModule],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategey, RefreshTokenStrategy],
    exports: [AuthService],
})
export class AuthModule {}
