import { Injectable } from '@nestjs/common';
import { SendMailOtpDto } from './dto/otp.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export default class MailService {
    constructor(private mailerService: MailerService) {}
    async sendOtpMail({ name, otp, subject, to }: SendMailOtpDto) {
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                template: __dirname + '/templates/otp',
                context: {
                    name,
                    otp,
                },
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
