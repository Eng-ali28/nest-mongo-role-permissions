import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { NumberLength } from 'src/common';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class VerifyCodeDto {
    @IsEmail({}, { message: i18nValidationMessage<I18nTranslations>('validation.INVALID_EMAIL') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    email: string;

    @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.IS_NUMBER') })
    @NumberLength(5, 5)
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    otp: number;
}
