import { Global, Module } from '@nestjs/common';
import FileDeleteService from './file-delete.service';
import WhatsappService from './whatsapp.service';
import { TasksService } from './tasks.service';
import TimeService from './time.service';
import { TranslateException } from './translate.exciption.service';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import MailService from './mail/mail.service';
import HashService from './hash.service';

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                transport: {
                    host: config.get<string>('MAIL_HOST'),
                    auth: {
                        user: config.get<string>('MAIL_USER'),
                        pass: config.get<string>('MAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: 'Apex ' + config.get<string>('SUPPORT_EMAIL'),
                },
                template: {
                    dir: join(__dirname, 'mail', 'templates'),
                    adapter: new HandlebarsAdapter(undefined, { inlineCssEnabled: true }),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
    providers: [
        FileDeleteService,
        WhatsappService,
        TasksService,
        TimeService,
        TranslateException,
        MailService,
        HashService,
    ],
    exports: [FileDeleteService, WhatsappService, TimeService, TranslateException, MailService, HashService],
})
export default class UtilModule {}
