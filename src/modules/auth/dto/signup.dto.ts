import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class SignUpDto extends CreateUserDto {
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsOptional({ message: i18nValidationMessage<I18nTranslations>('validation.OPTIONAL') })
    deviceToken: string;

    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    deviceName: string;
}
