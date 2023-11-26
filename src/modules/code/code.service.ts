import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CodeRepository } from './code.repository';
import { SendOtpDto } from './dto/send-otp.dto';
import { UsersRepository } from '../users/users.repository';

import * as moment from 'moment';
import { VerifyCodeDto } from './dto/verify-code.dto';
import MailService from 'src/common/util/mail/mail.service';
import WhatsappService from 'src/common/util/whatsapp.service';

@Injectable()
export class CodeService {
    constructor(
        private readonly whatsappService: WhatsappService,
        private readonly codeRepository: CodeRepository,
    ) {}

    async sendOtp(sendOtpDto: SendOtpDto, message: string) {
        const findCode = await this.codeRepository.findOne({ phoneNumber: sendOtpDto.phoneNumber });
        if (findCode && moment().isBefore(moment(findCode.createdAt).add(10, 'minutes'))) {
            throw new BadRequestException('You already has OTP code.');
        }

        const minm = 100000;
        const maxm = 999999;
        const otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
        // send otp via whatsapp
        await this.whatsappService.sendOtp(sendOtpDto.phoneNumber, otp);

        await this.codeRepository.create({ phoneNumber: sendOtpDto.phoneNumber, otp });

        return message;
    }

    async verifyCode(verifyCodeDto: VerifyCodeDto, message: string) {
        const code = await this.codeRepository.findCodeByPhoneNumberAndOtp(verifyCodeDto);
        if (!code) throw new BadRequestException('Invalid OTP.');

        code.active = true;
        await code.save();

        return message;
    }
}
