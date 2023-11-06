import { Injectable } from '@nestjs/common';
import { DeleteRefreshTokenDto } from './dto/delete.dto';
import { UpdateRefreshTokenDto } from './dto/update.dto';
import { RefreshToken } from './schemas/refreshToken.schema';
import { RefreshTokenRepository } from './refreshToken.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async updateRefreshToken({
    deviceName,
    userId,
    refreshToken,
  }: UpdateRefreshTokenDto): Promise<RefreshToken> {
    const findRefreshToken = await this.getRefreshToken(userId, deviceName);

    let newRefreshToken: RefreshToken;
    if (!findRefreshToken) {
      newRefreshToken = await this.refreshTokenRepository.create({
        deviceName,
        userId,
        refreshToken,
      });
    } else {
      findRefreshToken.set({ deviceName });
      newRefreshToken = await findRefreshToken.save();
    }

    return newRefreshToken;
  }

  async deleteRefreshToken({
    deviceName,
    userId,
  }: DeleteRefreshTokenDto): Promise<void> {
    const findRefreshToken = await this.getRefreshToken(userId, deviceName);

    findRefreshToken.set({ refreshToken: null });

    await findRefreshToken.save();
  }

  async getRefreshToken(
    userId: string,
    deviceName: string,
  ): Promise<RefreshToken> {
    const findRefreshToken = await this.refreshTokenRepository.findOne({
      userId,
      deviceName,
    });

    return findRefreshToken;
  }
}
