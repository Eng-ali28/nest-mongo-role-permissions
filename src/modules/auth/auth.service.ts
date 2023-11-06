import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Payload } from './types/payload.types';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

import { AuthResponeType } from './types/responeType';

import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from '../refresh token/refreshToken.service';
import { UsersRepository } from '../users/users.repository';
import { CodeRepository } from '../code/code.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly codeRepository: CodeRepository,
        private readonly RefreshTokenService: RefreshTokenService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async signup(signUpDto: SignUpDto): Promise<AuthResponeType> {
        const { password, deviceName, ...data } = signUpDto;

        const findUser = await this.userRepository.findOne({ email: data.email });
        if (findUser) throw new BadRequestException('Email already exists.');

        const code = await this.codeRepository.findActiveCode(data.email);
        if (!code) throw new BadRequestException('Please verify your email.');

        const user = await this.userRepository.create({
            ...data,
            password: await this.hashData(password),
        });

        const userLeanObject = user.toObject();

        const payload: Payload = {
            userId: user._id,
            isAdmin: user.isAdmin,
            deviceName,
        };

        const tokens = await this.getTokens(payload);

        await this.updateRefreshToken(user.id, deviceName, tokens.refreshToken);

        return {
            ...userLeanObject,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async login({ deviceName, ...loginDto }: LoginDto) {
        let user = await this.userRepository.findOne({ email: loginDto.email });
        if (!user) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        if (!(await this.isMatchHashed(user.password, loginDto.password))) {
            throw new UnauthorizedException('Invalid phone or password.');
        }

        const payload: Payload = {
            userId: user._id,
            isAdmin: user.isAdmin,
            deviceName,
        };

        loginDto.deviceToken ? user.set({ deviceToken: loginDto.deviceToken }) : null;

        const tokens = await this.getTokens(payload);
        await this.updateRefreshToken(user.id, deviceName, tokens.refreshToken);

        return {
            ...user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    // async verifyUserAccount(): Promise<Record<string, string>> {
    //   const decode = this.decodeToken(token);

    //   if (!decode.email) {
    //     throw new BadRequestException('Invalid confirmation token.');
    //   }

    //   const user = await this.userRepository.getUserByEmail(decode.email);

    //   user.isActive = true;

    //   await user.save();

    //   const payload: Payload = {
    //     userId: user._id,
    //     deviceName,
    //   };

    //   const tokens = await this.getTokens(payload);
    //   await this.updateRefreshToken(user.id, deviceName, tokens.refreshToken);

    //   return {
    //     msg: 'Your account has been verified.',
    //     accessToken: tokens.accessToken,
    //     refreshToken: tokens.refreshToken,
    //   };
    // }

    // async forgotPasswordByEmail(
    //   forgotPasswordDto: ForgotPasswordDto,
    //   token: string,
    // ): Promise<Record<string, string>> {
    //   const { newPassword, deviceName } = forgotPasswordDto;

    //   const decode = this.decodeToken(token);

    //   if (!decode.email) {
    //     throw new BadRequestException('Invalid confirmation token.');
    //   }

    //   const user = await this.userRepository.getUserByEmail(decode.email);

    //   const hashPassword = await this.hashData(newPassword);

    //   user.password = hashPassword;
    //   await user.save();

    //   const payload: Payload = {
    //     userId: user._id,
    //     deviceName,
    //   };

    //   const tokens = await this.getTokens(payload);

    //   await this.updateRefreshToken(user.id, deviceName, tokens.refreshToken);

    //   return {
    //     msg: 'Your password changed successfully.',
    //     accessToken: tokens.accessToken,
    //     refreshToken: tokens.refreshToken,
    //   };
    // }

    async getTokens(payload: Payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    ...payload,
                },
                {
                    secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
                    expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXP'),
                },
            ),
            this.jwtService.signAsync(
                {
                    ...payload,
                },
                {
                    secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
                    expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXP'),
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(userId: string, deviceName: string) {
        return this.RefreshTokenService.deleteRefreshToken({ userId, deviceName });
    }

    async refreshTokens({ deviceName, userId, refreshToken }: Payload): Promise<AuthResponeType> {
        const user = await this.userRepository.findOne({ _id: userId });

        const oldRefreshToken = await this.RefreshTokenService.getRefreshToken(userId, deviceName);

        const refreshTokenMatches = await argon2.verify(oldRefreshToken.refreshToken, refreshToken);
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

        const payload: Payload = {
            userId: user._id,
            isAdmin: user.isAdmin,
            deviceName,
        };
        const tokens = await this.getTokens(payload);

        await this.updateRefreshToken(user.id, deviceName, tokens.refreshToken);

        const userLeanObject = user.toObject();

        return {
            ...userLeanObject,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async updateRefreshToken(userId: string, deviceName: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.RefreshTokenService.updateRefreshToken({
            userId,
            deviceName,
            refreshToken,
        });
    }

    // async sendVerifyEmail(emailDto: NotifyEmailDto) {
    //   try {
    //     const token = this.generateToken(emailDto.email);
    //     const url = `${process.env.BASE_URL}/auth/verify-account?token=${token}`;

    //     emailDto.url = url;
    //     await this.mailService.sendUserConfirmationEmail(emailDto);

    //     return 'send successfully.';
    //   } catch (error) {
    //     throw new BadRequestException('Faild send email.');
    //   }
    // }

    // async sendForgotPasswordEmail(emailDto: NotifyEmailDto) {
    //   try {
    //     const token = this.generateToken(emailDto.email);
    //     const url = `${process.env.BASE_URL}/auth/forgot-password?token=${token}`;

    //     emailDto.url = url;
    //     await this.mailService.sendUserForgotPassword(emailDto);

    //     return 'send successfully.';
    //   } catch (error) {
    //     throw new BadRequestException('Faild in send email.');
    //   }
    // }

    private hashData(data: string) {
        return argon2.hash(data);
    }

    private async isMatchHashed(hash: string, current: string): Promise<boolean> {
        const isMatch = await argon2.verify(hash, current);
        return isMatch;
    }

    private generateToken(email: string) {
        return this.jwtService.sign(
            { email },
            {
                expiresIn: this.configService.get<string>('EXP_TOKEN_PARAM'),
                secret: this.configService.get<string>('SECRET_TOKEN_PARAM'),
            },
        );
    }

    private decodeToken(token: string) {
        const decode = this.jwtService.verify(token, {
            secret: process.env.SECRET_TOKEN_PARAM,
        });

        return decode;
    }
}
