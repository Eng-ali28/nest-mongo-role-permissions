import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CodeRepository } from './code.repository';
import { SendOtpDto } from './dto/send-otp.dto';
import { UsersRepository } from '../users/users.repository';

import * as moment from 'moment';
import { VerifyCodeDto } from './dto/verify-code.dto';
import MailService from 'src/common/util/mail/mail.service';

@Injectable()
export class CodeService {
    constructor(
        private readonly mailService: MailService,
        private readonly codeRepository: CodeRepository,
    ) {}

    async sendOtp(sendOtpDto: SendOtpDto, message: string) {
        const findCode = await this.codeRepository.findOne({ email: sendOtpDto.email });
        if (findCode && moment().isBefore(moment(findCode.createdAt).add(10, 'minutes'))) {
            throw new BadRequestException('You already has OTP code.');
        }

        const minm = 10000;
        const maxm = 99999;
        const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
        // send otp via email
        await this.mailService.sendOtpMail({
            name: 'Dear',
            to: sendOtpDto.email,
            otp,
            subject: 'OTP for verify email.',
            message: sendOtpDto.message,
        });

        await this.codeRepository.create({ email: sendOtpDto.email, otp });

        return message;
    }

    async verifyCode(verifyCodeDto: VerifyCodeDto, message: string) {
        const code = await this.codeRepository.findCodeByEmailAndOtp(verifyCodeDto);
        if (!code) throw new BadRequestException('Invalid OTP.');

        code.active = true;
        await code.save();

        return message;
    }
}
