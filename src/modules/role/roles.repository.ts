import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { EntityRepository } from 'src/common';
import { Role } from './schemas/roles.schema';

@Injectable()
export class RolesRepository extends EntityRepository<Role> {
    constructor(@InjectModel(Role.name) private RoleModel: Model<Role>) {
        super(RoleModel);
    }
}
