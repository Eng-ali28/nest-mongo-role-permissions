import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class SendOtpDto {
    @IsPhoneNumber(undefined, { message: i18nValidationMessage<I18nTranslations>('validation.PHONENUMBER') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    phoneNumber: string;

    message: string;
}
