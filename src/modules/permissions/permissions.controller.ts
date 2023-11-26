import {
    Controller, Get, Post, Body, Param, Delete, Query, Put
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { MagicQueryDto } from 'src/common';
import { UpdatePermissionDto } from './dto/update-permission.dto';


@Controller('permissions')
export class PermissionsController {
    constructor(
        private readonly permissionsService: PermissionsService,
        //private readonly adSeeder: ADSeeder,
    ) { }

    @Post()
    createNewPermission(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }

    @Get(':id')
    async getPermission(@Param('id') id: string) {
        return await this.permissionsService.findOneById(id);
    }

    @Get()
    async getPermissions(@Query() magicQueryDto: MagicQueryDto) {
        return await this.permissionsService.findAll(magicQueryDto);
    }

    @Put(':id')
    async updatePermission(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
        return await this.permissionsService.update(id, updatePermissionDto);
    }

    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        await this.permissionsService.delete(id);
        return 'Deleted successfully.';
    }
}
