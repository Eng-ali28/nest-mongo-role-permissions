import { Body, Controller, Post } from '@nestjs/common';
import { CodeService } from './code.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Controller('code')
export class CodeController {
    constructor(private readonly codeService: CodeService) {}

    @Post('send_otp')
    async sendOtp(@Body() sendOtpDto: SendOtpDto) {
        return await this.codeService.sendOtp(sendOtpDto, 'OTP sent successfully.');
    }

    @Post('verify_account')
    async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
        return await this.codeService.verifyCode(verifyCodeDto, 'Code verified successfully.');
    }
}
