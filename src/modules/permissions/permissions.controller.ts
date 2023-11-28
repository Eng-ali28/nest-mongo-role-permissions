import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { MagicQueryDto, ParseMongoIdPipe } from 'src/common';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';

@Controller('permissions')
export class PermissionsController {
    constructor(
        private readonly permissionsService: PermissionsService, //private readonly adSeeder: ADSeeder,
    ) {}

    @Auth('Hello')
    @Get('/test')
    async testdd() {
        return 'good ';
    }

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
    async updatePermission(
        @Param('id', ParseMongoIdPipe) id: string,
        @Body() updatePermissionDto: UpdatePermissionDto,
    ) {
        return await this.permissionsService.update(id, updatePermissionDto);
    }

    @Delete(':id')
    async deleteCategory(@Param('id', ParseMongoIdPipe) id: string) {
        await this.permissionsService.delete(id);
        return 'Deleted successfully.';
    }
}
