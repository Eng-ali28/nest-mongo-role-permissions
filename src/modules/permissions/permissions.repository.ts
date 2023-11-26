import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { EntityRepository } from 'src/common';
import { Permission } from './schemas/permission.schema';

@Injectable()
export class PermissionsRepository extends EntityRepository<Permission> {
    constructor(@InjectModel(Permission.name) private permissionModel: Model<Permission>) {
        super(permissionModel);
    }
}
