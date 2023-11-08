import { IsNotEmpty, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class UpdateUserPasswordDto {
    @Length(8, 64, { message: i18nValidationMessage<I18nTranslations>('validation.LENGTH', {}) })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    oldPassword: string;

    @Length(8, 64, { message: i18nValidationMessage<I18nTranslations>('validation.LENGTH', {}) })
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    newPassword: string;
}
