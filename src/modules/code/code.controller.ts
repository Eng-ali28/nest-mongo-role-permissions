import { Body, Controller, Post } from '@nestjs/common';
import { CodeService } from './code.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('code')
export class CodeController {
    constructor(private readonly codeService: CodeService) {}

    @Post('verify_account_otp')
    async sendOtpVerifyAccount(@Body() sendOtpDto: SendOtpDto) {
        sendOtpDto.message = 'verify your phone number';
        return await this.codeService.sendOtp(
            sendOtpDto,
            'OTP sent successfully, check your phone number and verify account.',
        );
    }

    @Post('verify_account')
    async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
        return await this.codeService.verifyCode(verifyCodeDto, 'Code verified successfully.');
    }

    @Post('forgot_password_otp')
    async sendOtpForgotPassword(@Body() sendOtpDto: SendOtpDto) {
        sendOtpDto.message = 'reset your password';
        return await this.codeService.sendOtp(
            sendOtpDto,
            'OTP sent successfully, check your phone number and reset your password.',
        );
    }
}
