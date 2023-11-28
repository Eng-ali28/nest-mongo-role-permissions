// src/permissions/permission.seeder.ts
import { Injectable } from '@nestjs/common';

import { PermissionsService } from './permissions.service';
import { permissionsForPermissions } from './permissions/permissions';
import { log } from 'console';

@Injectable()
export class PermissionSeeder {
    constructor(private readonly permissionsService: PermissionsService) {}

    async seed() {
        for (const permission of permissionsForPermissions) {
            if (!(await this.permissionsService.findOneByAction(permission.action))) {
                await this.permissionsService.create(permission);
            }
        }
    }
}
