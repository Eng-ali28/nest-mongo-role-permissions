import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { ADSeeder } from './categories.seeder';
import { Permissions, PermissionSchema } from './schemas/permission.schema';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionsRepository } from './permissions.repository';
import { PermissionSeeder } from './permissions.seeder';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        AuthModule,
        MongooseModule.forFeature([{ name: Permissions.name, schema: PermissionSchema }]),
    ],
    controllers: [PermissionsController],
    providers: [PermissionsService, PermissionsRepository, PermissionSeeder],
    exports: [PermissionsService],
})
export class PermissionsModule implements OnModuleInit {
    constructor(private readonly permissionSeeder: PermissionSeeder) {}
    async onModuleInit() {
        await this.permissionSeeder.seed();
    }
}
