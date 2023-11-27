// src/permissions/permission.seeder.ts
import { Injectable } from '@nestjs/common';

import { permissions } from './permissions/permissions';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RoleSeeder {
    constructor(private readonly permissionsService: PermissionsService) {}

    async seed() {
        for (const permission of permissions) {
            if (!(await this.permissionsService.findOneByAction(permission.action))) {
                await this.permissionsService.create(permission);
            }
        }
    }
}
