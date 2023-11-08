import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserByAdminDto, UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import TimeService from 'src/common/util/time.service';
import HashService from 'src/common/util/hash.service';
import { MagicQueryDto } from 'src/common';
import { FilterQuery } from 'mongoose';
import { UpdateUserPasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private hashService: HashService,
    ) {}

    async getUserById(userId: string): Promise<User> {
        const user = await this.usersRepository.findOne({ _id: userId });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ email: email });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    async getUsers(magicQuery: MagicQueryDto): Promise<{ data: User[]; count: number }> {
        let filterQueryObj: FilterQuery<User> = {};

        if (magicQuery.q) {
            filterQueryObj.$or = [
                { email: { $regex: magicQuery.q, $options: 'im' } },
                { firstName: { $regex: magicQuery.q, $options: 'im' } },
            ];
        }

        return await this.usersRepository.findWithPagination({
            filterQuery: filterQueryObj,
            option: { sort: magicQuery.sort ? magicQuery.sort.split(',').join(' ') : '-createdAt' },
            paginateDto: { pageNumber: magicQuery.pageNumber, pageSize: magicQuery.pageSize },
        });
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const hashPassword = await this.hashService.hashData(createUserDto.password);

        return await this.usersRepository.create({ ...createUserDto, password: hashPassword });
    }

    async updateUserByAdmin(userId: string, userUpdates: UpdateUserByAdminDto): Promise<User> {
        const hashPassword = userUpdates.password ? await this.hashService.hashData(userUpdates.password) : undefined;
        return await this.usersRepository.findOneAndUpdate({ _id: userId }, { ...userUpdates, password: hashPassword });
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return await this.usersRepository.findOneAndUpdate({ _id: userId }, userUpdates);
    }

    async updateUserPassword(userId: string, { newPassword, oldPassword }: UpdateUserPasswordDto): Promise<User> {
        const findUser = await this.usersRepository.findOne({ _id: userId });

        const matchPassword = await this.hashService.isMatchHashed(findUser.password, oldPassword);
        if (!matchPassword) throw new BadRequestException('Old password is incorrect.');

        const hashPassword = await this.hashService.hashData(newPassword);

        findUser.set({ password: hashPassword });
        const updatedUser = await findUser.save();

        return updatedUser;
    }

    async setUserImage(userId: string, image: string): Promise<User> {
        return await this.usersRepository.findOneAndUpdate({ _id: userId }, { image });
    }
}
