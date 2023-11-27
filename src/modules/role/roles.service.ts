import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { MagicQueryDto } from 'src/common';

import { RolesRepository } from './roles.repository';
import { Role } from './schemas/roles.schema';

import { log } from 'console';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(private readonly rolesRepository: RolesRepository) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        return await this.rolesRepository.create(createRoleDto);
    }

    async findAll(magicQueryDto: MagicQueryDto): Promise<{ data: Role[]; count: number }> {
        return await this.rolesRepository.findWithPagination({
            filterQuery: {},
            option: {
                populate: 'permissions',
                sort: magicQueryDto.sort ? magicQueryDto.sort.split(',').join(' ') : '-createdAt',
            },
            paginateDto: {},
        });
    }

    async findOneById(id: string): Promise<Role> {
        let role = await this.rolesRepository.findOne({ _id: id });
        if (!role) throw new NotFoundException('Role not found');
        return role;
    }

    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
        let role = await this.rolesRepository.findOne({ _id: id });
        if (!role) throw new NotFoundException('Role not found');

        return await this.rolesRepository.findOneAndUpdate({ _id: id }, updateRoleDto);
    }

    async delete(id: string) {
        let role = await this.rolesRepository.findOne({ _id: id });
        if (!role) throw new NotFoundException('Role not found');
        return await this.rolesRepository.deleteMany({ _id: id });
    }

    // helper:
    async findOneByName(name: string): Promise<Role> {
        return await this.rolesRepository.findOne({ name });
    }
}
