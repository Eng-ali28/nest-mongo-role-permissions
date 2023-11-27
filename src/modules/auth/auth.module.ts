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
import { FOLDER_TOKEN } from 'src/common';
import { RolesModule } from '../role/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
    imports: [
        PassportModule,
        CodeModule,
        JwtModule.register({}),
        UsersModule,
        RefreshTokenModule,
        PermissionsModule,
        RolesModule
    ],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategey, RefreshTokenStrategy],
})
export class AuthModule { }
