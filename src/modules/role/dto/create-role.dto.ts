import { Transform } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class CreateRoleDto {
    @Transform((o) => o.value.toUpperCase())
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    name: string;

    @IsMongoId({ each: true, message: i18nValidationMessage<I18nTranslations>('validation.IS_MONGOID') })
    @IsArray()
    @IsNotEmpty({ message: i18nValidationMessage<I18nTranslations>('validation.NOT_EMPTY') })
    permissions: string[];
}
