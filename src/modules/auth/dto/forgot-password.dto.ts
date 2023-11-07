import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { NumberLength } from 'src/common';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class ForgotPasswordDto {
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @Length(8, 64, { message: i18nValidationMessage<I18nTranslations>('validation.LENGTH', {}) })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    newPassword: string;

    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsEmail({}, { message: i18nValidationMessage<I18nTranslations>('validation.INVALID_EMAIL') })
    email: string;

    @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.IS_NUMBER') })
    @NumberLength(5, 5)
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    otp: number;

    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    deviceName: string;
}
