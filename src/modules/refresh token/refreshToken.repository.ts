import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'src/common';
import { RefreshToken } from './schemas/refreshToken.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RefreshTokenRepository extends EntityRepository<RefreshToken> {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly RefreshTokenModel: Model<RefreshToken>,
  ) {
    super(RefreshTokenModel);
  }
}
