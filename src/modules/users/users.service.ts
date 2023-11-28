import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserByAdminDto, UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import HashService from 'src/common/util/hash.service';
import { MagicQueryDto } from 'src/common';
import { FilterQuery } from 'mongoose';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { ROLE } from '../role/roles/role.enum';
import { RolesService } from '../role/roles.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly hashService: HashService,
        private readonly RoleService: RolesService,
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

    async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
        const user = await this.usersRepository.findOne({ phoneNumber });

        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    async getUsers(magicQuery: MagicQueryDto): Promise<{ data: User[]; count: number }> {
        let filterQueryObj: FilterQuery<User> = {};

        if (magicQuery.q) {
            filterQueryObj.$or = [
                { email: { $regex: magicQuery.q, $options: 'im' } },
                { phoneNumber: { $regex: magicQuery.q, $options: 'im' } },
                { firstName: { $regex: magicQuery.q, $options: 'im' } },
            ];
        }

        return await this.usersRepository.findWithPagination({
            filterQuery: filterQueryObj,
            option: { sort: magicQuery.sort ? magicQuery.sort.split(',').join(' ') : '-createdAt' },
            paginateDto: { pageNumber: magicQuery.pageNumber, pageSize: magicQuery.pageSize },
        });
    }

    async createUser({ roles, ...createUserDto }: CreateUserDto): Promise<User> {
        const hashPassword = await this.hashService.hashData(createUserDto.password);
        const userRoles = roles || [ROLE.USER_ROLE];
        return await this.usersRepository.create({ ...createUserDto, roles: userRoles, password: hashPassword });
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

    async getUserPermissionsByUserId(userId: string) {
        const { roles } = await this.usersRepository.findOne(
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

    async setUserImage(userId: string, image: string): Promise<User> {
        return await this.usersRepository.findOneAndUpdate({ _id: userId }, { image });
    }
}
