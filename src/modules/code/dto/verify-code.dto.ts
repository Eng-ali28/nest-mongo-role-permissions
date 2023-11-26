import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { NumberLength } from 'src/common';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class VerifyCodeDto {
    @IsPhoneNumber(undefined, { message: i18nValidationMessage<I18nTranslations>('validation.PHONENUMBER') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    phoneNumber: string;

    @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.IS_NUMBER') })
    @NumberLength(5, 5)
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    otp: number;
}
