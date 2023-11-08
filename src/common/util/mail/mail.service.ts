import { Injectable } from '@nestjs/common';
import { SendMailOtpDto } from './dto/otp.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export default class MailService {
    constructor(private mailerService: MailerService) {}
    async sendOtpMail({ name, otp, subject, to, message }: SendMailOtpDto) {
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                template: __dirname + '/templates/otp',
                context: {
                    name,
                    otp,
                    message,
                },
            });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
