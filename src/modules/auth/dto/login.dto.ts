import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class LoginDto {
    @IsEmail({}, { message: i18nValidationMessage<I18nTranslations>('validation.INVALID_EMAIL') })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    email: string;

    @Length(8, 64, { message: i18nValidationMessage<I18nTranslations>('validation.LENGTH', {}) })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    password: string;

    @IsOptional({ message: i18nValidationMessage<I18nTranslations>('validation.OPTIONAL') })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    deviceToken: string;

    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    deviceName: string;
}
