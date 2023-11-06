import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export default class WhatsappService {
    private logger: Logger;
    constructor(private config: ConfigService) {
        this.logger = new Logger();
    }

    async sendOtp(to: string, otp: number): Promise<void> {
        const token = this.config.get<string>('WHATSAPP_TOKEN');
        const instance = this.config.get<string>('WHATSAPP_INSTANCE_ID');

        const data = qs.stringify({
            token,
            to,
            body: `Hi, your verfication code is ${otp}, it is available for 5 minuits.`,
        });

        const config = {
            method: 'post',
            url: `https://api.ultramsg.com/${instance}/messages/chat`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
        };

        try {
            const response = await axios(config);
            this.logger.log(JSON.stringify(response.data));
        } catch (error) {
            throw new BadGatewayException('Wrong in whatsapp gateway.');
        }
    }
}
