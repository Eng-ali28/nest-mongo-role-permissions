import { IsEmail, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class SendOtpDto {
    @IsEmail({}, { message: i18nValidationMessage<I18nTranslations>('validation.INVALID_EMAIL') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    email: string;

    message: string;
}
