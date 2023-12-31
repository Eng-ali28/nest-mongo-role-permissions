import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { NumberLength } from 'src/common/decorators/validation/validate-number.decorator';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class VerifyUserDto {
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    @IsPhoneNumber(null, { message: i18nValidationMessage<I18nTranslations>('validation.PHONENUMBER') })
    phoneNumber: string;

    @NumberLength(6, 6)
    @IsNumber({}, { message: i18nValidationMessage<I18nTranslations>('validation.IS_NUMBER') })
    @Type(() => Number)
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    otp: number;

    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    deviceName: string;
}
