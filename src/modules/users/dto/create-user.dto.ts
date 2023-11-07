import { IsEmail, IsISO31661Alpha2, IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class CreateUserDto {
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @Length(2, 64, { message: i18nValidationMessage<I18nTranslations>('validation.LENGTH', {}) })
    firstName: string;

    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @Length(2, 64, { message: i18nValidationMessage<I18nTranslations>('validation.LENGTH', {}) })
    lastName: string;

    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @Length(2, 64, { message: i18nValidationMessage<I18nTranslations>('validation.LENGTH', {}) })
    companyName: string;

    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsISO31661Alpha2({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    country: string;

    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsPhoneNumber()
    phoneNumber: string;

    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsEmail({}, { message: i18nValidationMessage<I18nTranslations>('validation.INVALID_EMAIL') })
    email: string;

    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @Length(8, 64, { message: i18nValidationMessage<I18nTranslations>('validation.LENGTH', {}) })
    password: string;
}
