import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class SignUpDto extends CreateUserDto {
    @IsOptional({
        message: i18nValidationMessage<I18nTranslations>('validation.OPTIONAL'),
      })
      @IsString({
        message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING'),
      })
      deviceToken: string;

    @IsNotEmpty({
        message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY'),
      })
    @IsString({
        message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING'),
      })
    deviceName: string;
}
