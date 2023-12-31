import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CurrentUser } from './decorators/currentuser.decorator';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { AuthRequest, USER } from './types/authUser.types';
import { AuthService } from './auth.service';
import { Payload } from './types/payload.types';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() signUpDto: SignUpDto) {
        return await this.authService.signup(signUpDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Get('logout')
    async logout(@CurrentUser() payload: Payload) {
        await this.authService.logout(payload.userId, payload.deviceName);
        return 'Logout successfully';
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: AuthRequest) {
        const userId = req.user.userId;
        const refreshToken = req.user.refreshToken;

        return this.authService.refreshTokens({ userId, refreshToken, deviceName: req.user.deviceName });
    }

    @Put('forgot_password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<Record<string, string>> {
        return await this.authService.forgotPassword(forgotPasswordDto);
    }
}
