import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { MagicQueryDto } from 'src/common';

import { PermissionsRepository } from './permissions.repository';
import { Permissions } from './schemas/permission.schema';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { log } from 'console';

@Injectable()
export class PermissionsService {
    constructor(private readonly permissionsRepository: PermissionsRepository) {}

    async create(createPermissionDto: CreatePermissionDto): Promise<Permissions> {
        let permission = await this.permissionsRepository.findOne({ action: createPermissionDto.action });
        if (permission) throw new BadRequestException('This permission already exists!');
        return await this.permissionsRepository.create(createPermissionDto);
    }

    async findAll(magicQueryDto: MagicQueryDto): Promise<{ data: Permissions[]; count: number }> {
        return await this.permissionsRepository.findWithPagination({
            filterQuery: {},
            option: { sort: magicQueryDto.sort ? magicQueryDto.sort.split(',').join(' ') : '-createdAt' },
            paginateDto: {},
        });
    }

    async findOneById(id: string): Promise<Permissions> {
        let permission = await this.permissionsRepository.findOne({ _id: id });
        if (!permission) throw new NotFoundException('Permissions not found');
        return permission;
    }

    async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permissions> {
        let permission = await this.permissionsRepository.findOne({ _id: id });
        if (!permission) throw new NotFoundException('Permissions not found');
        return await this.permissionsRepository.findOneAndUpdate({ _id: id }, updatePermissionDto);
    }

    async delete(id: string) {
        let permission = await this.permissionsRepository.findOne({ _id: id });
        if (!permission) throw new NotFoundException('Permissions not found');
        return await this.permissionsRepository.deleteMany({ _id: id });
    }

    // helper:
    async findOneByAction(action: string): Promise<Permissions> {
        return await this.permissionsRepository.findOne({ action: action });
    }
}
