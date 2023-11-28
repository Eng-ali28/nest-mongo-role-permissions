import { Role } from 'src/common';
import { ROLE } from './role.enum';
import { RolesPermissionsEnum } from '../permissions/permissions.enum';
import { UsersPermissionsEnum } from 'src/modules/users/permissions/permissions.enum';

export const roles: Role[] = [
    {
        name: ROLE.USER_ROLE,
        permissions: [...Object.values(UsersPermissionsEnum)],
    },
    {
        name: ROLE.SUPER_ADMIN,
        permissions: [...Object.values(RolesPermissionsEnum), ...Object.values(UsersPermissionsEnum)],
    },
];
