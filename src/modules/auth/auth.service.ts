import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Payload } from './types/payload.types';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

import { AuthResponeType } from './types/responeType';

import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from '../refresh token/refreshToken.service';
import { UsersRepository } from '../users/users.repository';
import { CodeRepository } from '../code/code.repository';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import HashService from 'src/common/util/hash.service';
import { ROLE } from '../role/roles/role.enum';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly codeRepository: CodeRepository,
        private readonly RefreshTokenService: RefreshTokenService,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
        private readonly configService: ConfigService,
    ) {}

    async signup(signUpDto: SignUpDto): Promise<AuthResponeType> {
        const { password, deviceName, ...data } = signUpDto;

        const findUser = await this.userRepository.findOne({ phoneNumber: data.phoneNumber });
        if (findUser) throw new BadRequestException('phoneNumber already exists.');

        const code = await this.codeRepository.findActiveCode(data.phoneNumber);
        if (!code) throw new BadRequestException('Please confirm your phone number first.');

        const user = await this.userRepository.create({
            ...data,
            password: await this.hashService.hashData(password),
            roles: [ROLE.USER_ROLE],
        });

        const userLeanObject = user.toObject();

        const payload: Payload = {
            userId: user._id,

            deviceName,
        };

        const tokens = await this.getTokens(payload);

        await this.updateRefreshToken(user.id, deviceName, tokens.refreshToken);
        log(tokens);
        return {
            ...userLeanObject,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async login({ deviceName, ...loginDto }: LoginDto) {
        let user = await this.userRepository.findOne({ phoneNumber: loginDto.phoneNumber });
        if (!user) {
            throw new UnauthorizedException('Invalid phoneNumber or password.');
        }

        if (!(await this.hashService.isMatchHashed(user.password, loginDto.password))) {
            throw new UnauthorizedException('Invalid phoneNumber or password.');
        }

        const payload: Payload = {
            userId: user._id,

            deviceName,
        };

        loginDto.deviceToken ? user.set({ deviceToken: loginDto.deviceToken }) : null;

        const tokens = await this.getTokens(payload);
        await this.updateRefreshToken(user.id, deviceName, tokens.refreshToken);
        const userLeanObject = user.toObject();

        return {
            ...userLeanObject,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<Record<string, string>> {
        const { newPassword, phoneNumber, otp, deviceName } = forgotPasswordDto;

        const code = await this.codeRepository.findCodeByPhoneNumberAndOtp({ phoneNumber, otp });
        if (!code) throw new BadRequestException('Invalid OTP.');

        const user = await this.userRepository.findOne({ phoneNumber });

        const hashPassword = await this.hashService.hashData(newPassword);

        user.password = hashPassword;
        await user.save();

        const payload: Payload = {
            userId: user._id,

            deviceName,
        };

        const tokens = await this.getTokens(payload);

        await this.updateRefreshToken(user.id, deviceName, tokens.refreshToken);

        return {
            msg: 'Your password changed successfully.',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

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

    async refreshTokens({ deviceName, userId, refreshToken }: Omit<Payload, 'isAdmin'>): Promise<AuthResponeType> {
        const user = await this.userRepository.findOne({ _id: userId });

        const oldRefreshToken = await this.RefreshTokenService.getRefreshToken(userId, deviceName);

        const refreshTokenMatches = await this.hashService.isMatchHashed(oldRefreshToken.refreshToken, refreshToken);
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

        const payload: Payload = {
            userId: user._id,

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
        const hashedRefreshToken = await this.hashService.hashData(refreshToken);

        await this.RefreshTokenService.updateRefreshToken({
            userId,
            deviceName,
            refreshToken: hashedRefreshToken,
        });
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

    async getUserPermissionsByUserId(userId: string) {
        const { roles } = await this.userRepository.findOne(
            { _id: userId },
            {
                lean: true,
                projection: { roles: 1 },
                populate: {
                    path: 'roles',
                    foreignField: 'name',
                },
            },
        );

        const permissions = [
            ...new Set(
                roles
                    .map((role) => {
                        return role.permissions;
                    })
                    .flat(),
            ),
        ];

        return permissions;
    }

    private decodeToken(token: string) {
        const decode = this.jwtService.verify(token, {
            secret: process.env.SECRET_TOKEN_PARAM,
        });

        return decode;
    }
}
