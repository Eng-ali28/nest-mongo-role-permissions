import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { FOLDER_TOKEN } from 'src/common';
import { RolesModule } from '../role/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [RolesModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, { provide: FOLDER_TOKEN, useValue: 'user' }],
    exports: [UsersService, UsersRepository],
})
export class UsersModule {}
