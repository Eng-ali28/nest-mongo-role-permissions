import { PartialType } from '@nestjs/mapped-types';
import { CreateRefreshTokenDto } from './create.dto';

export class UpdateRefreshTokenDto extends PartialType(CreateRefreshTokenDto) {}
