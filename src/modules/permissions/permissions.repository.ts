import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { EntityRepository } from 'src/common';
import { Permissions } from './schemas/permission.schema';

@Injectable()
export class PermissionsRepository extends EntityRepository<Permissions> {
    constructor(@InjectModel(Permissions.name) private permissionModel: Model<Permissions>) {
        super(permissionModel);
    }
}
