// src/permissions/permission.seeder.ts
import { Injectable } from '@nestjs/common';

import { permissionsForRole } from './permissions/permissions';
import { PermissionsService } from '../permissions/permissions.service';
import { roles } from './roles/roles';
import { RolesService } from './roles.service';

@Injectable()
export class RoleSeeder {
    constructor(
        private readonly permissionsService: PermissionsService,
        private readonly roleService: RolesService,
    ) {}

    async seed() {
        for (const permission of permissionsForRole) {
            if (!(await this.permissionsService.findOneByAction(permission.action))) {
                await this.permissionsService.create(permission);
            }
        }

        for (const role of roles) {
            if (!(await this.roleService.findOneByName(role.name))) {
                await this.roleService.create({ name: role.name, permissions: role.permissions });
            }
        }
    }
}
