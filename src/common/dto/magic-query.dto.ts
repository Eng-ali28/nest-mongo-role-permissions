import { IsOptional, IsString } from 'class-validator';
import { PaginateDto } from './paginate.dto';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/locales/generated/i18n.generated';

export class MagicQueryDto extends PaginateDto {
    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsOptional({ message: i18nValidationMessage<I18nTranslations>('validation.OPTIONAL') })
    q: string;

    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsOptional({ message: i18nValidationMessage<I18nTranslations>('validation.OPTIONAL') })
    filter: string;

    @IsString({ message: i18nValidationMessage<I18nTranslations>('validation.IS_STRING') })
    @IsOptional({ message: i18nValidationMessage<I18nTranslations>('validation.OPTIONAL') })
    sort: string;
}
