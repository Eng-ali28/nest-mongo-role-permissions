import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { ADSeeder } from './categories.seeder';
import { Role, RoleSchema } from './schemas/roles.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { RoleSeeder } from './roles.seeder';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
    imports: [PermissionsModule, MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
    controllers: [RolesController],
    providers: [RolesService, RolesRepository, RoleSeeder],
    exports: [RolesService],
})
export class RolesModule implements OnModuleInit {
    constructor(private readonly roleSeeder: RoleSeeder) {}
    async onModuleInit() {
        await this.roleSeeder.seed();
    }
}
