import { Body, Controller, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserByAdminDto, UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { CurrentUser, MagicQueryDto, ParseMongoIdPipe } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import ValidateImageTypePipe from 'src/common/pipes/image/validateSingleImageType';
import ImageInterceptor from 'src/common/interceptors/file-upload/singleImageUpload.interceptor';
import { USER } from '../auth/types/authUser.types';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { Auth } from 'src/modules/auth/decorators/auth.decorator';
import { UsersPermissionsEnum } from './permissions/permissions.enum';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Auth(UsersPermissionsEnum.GET_USER_BY_ID)
    @Get(':id')
    async getUser(@Param('id', ParseMongoIdPipe) userId: string): Promise<User> {
        return await this.usersService.getUserById(userId);
    }

    @Auth(UsersPermissionsEnum.GET_USERS)
    @Get()
    async getUsers(@Query() maigcQuery: MagicQueryDto): Promise<{ data: User[]; count: number }> {
        return await this.usersService.getUsers(maigcQuery);
    }

    @Auth(UsersPermissionsEnum.CREATE_USER)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Auth(UsersPermissionsEnum.UPDATE_USER_BY_ID)
    @Put()
    async updateUser(@CurrentUser(USER.ID) userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return await this.usersService.updateUser(userId, updateUserDto);
    }

    @Auth(UsersPermissionsEnum.UPDATE_USER_BY_ID)
    @Put('update_password')
    async updateUserPassword(
        @CurrentUser(USER.ID) userId: string,
        @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    ): Promise<User> {
        return await this.usersService.updateUserPassword(userId, updateUserPasswordDto);
    }

    @Auth(UsersPermissionsEnum.UPDATE_USER_BY_ID)
    @Put('admin/:id')
    async updateUserAdmin(
        @Param('id', ParseMongoIdPipe) userId: string,
        @Body() updateUserByAdminDto: UpdateUserByAdminDto,
    ): Promise<User> {
        return await this.usersService.updateUserByAdmin(userId, updateUserByAdminDto);
    }

    @Auth(UsersPermissionsEnum.UPDATE_USER_BY_ID)
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }), ImageInterceptor)
    @Put('set_image_admin/:id')
    async setImageAdmin(
        @Param('id', ParseMongoIdPipe) userId: string,
        @UploadedFile(new ValidateImageTypePipe(true)) file: Express.Multer.File,
    ): Promise<User> {
        return await this.usersService.setUserImage(userId, file.path);
    }

    @Auth(UsersPermissionsEnum.UPDATE_USER_BY_ID)
    @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }), ImageInterceptor)
    @Put('set_image/:id')
    async setImage(
        @CurrentUser(USER.ID) userId: string,
        @UploadedFile(new ValidateImageTypePipe(true)) file: Express.Multer.File,
    ): Promise<User> {
        return await this.usersService.setUserImage(userId, file.path);
    }
}
