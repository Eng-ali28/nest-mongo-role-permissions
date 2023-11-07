import { Body, Controller, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { ParseMongoIdPipe } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import ValidateImageTypePipe from 'src/common/pipes/image/validateSingleImageType';
import ImageInterceptor from 'src/common/interceptors/file-upload/singleImageUpload.interceptor';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async getUser(@Param('id', ParseMongoIdPipe) userId: string): Promise<User> {
        return await this.usersService.getUserById(userId);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return await this.usersService.getUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Put('admin/:id')
    async updateUserAdmin(
        @Param('id', ParseMongoIdPipe) userId: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return await this.usersService.updateUser(userId, updateUserDto);
    }

    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }), ImageInterceptor)
    @Put('set_image_admin/:id')
    async setImageAdmin(
        @Param('id', ParseMongoIdPipe) userId: string,
        @UploadedFile(new ValidateImageTypePipe(true)) file: Express.Multer.File,
    ): Promise<User> {
        return await this.usersService.setUserImage(userId, file.path);
    }
}
