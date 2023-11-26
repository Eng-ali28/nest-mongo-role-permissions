import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { MagicQueryDto, ParseMongoIdPipe } from 'src/common';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService, //private readonly adSeeder: ADSeeder,
    ) {}

    @Post()
    createNewRole(@Body() createRoleDto: CreateRoleDto) {
        return this.rolesService.create(createRoleDto);
    }

    @Get(':id')
    async getRole(@Param('id') id: string) {
        return await this.rolesService.findOneById(id);
    }

    @Get()
    async getRoles(@Query() magicQueryDto: MagicQueryDto) {
        return await this.rolesService.findAll(magicQueryDto);
    }

    @Put(':id')
    async updateRole(@Param('id', ParseMongoIdPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return await this.rolesService.update(id, updateRoleDto);
    }

    @Delete(':id')
    async deleteCategory(@Param('id', ParseMongoIdPipe) id: string) {
        await this.rolesService.delete(id);
        return 'Deleted successfully.';
    }
}
