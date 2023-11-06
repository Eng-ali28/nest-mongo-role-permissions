import { PickType } from '@nestjs/mapped-types';
import { CreateRefreshTokenDto } from './create.dto';

export class DeleteRefreshTokenDto extends PickType(CreateRefreshTokenDto, ['deviceName', 'userId']) {}
