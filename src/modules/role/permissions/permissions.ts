import { Permission } from 'src/common';
import { RolesPermissionsEnum } from './permissions.enum';
import { Role } from '../schemas/roles.schema';

export let permissionsForRole: Permission[] = [
    {
        action: RolesPermissionsEnum.CREATE_ROLE,
        function: 'Creating new role.',
        subject: Role.name,
    },
    {
        action: RolesPermissionsEnum.GET_ROLE_BY_ID,
        function: "Getting a role by it's id.",
        subject: Role.name,
    },
    {
        action: RolesPermissionsEnum.GET_ROLES,
        function: 'Getting all roles.',
        subject: Role.name,
    },
    {
        action: RolesPermissionsEnum.UPDATE_ROLE_BY_ID,
        function: "Updating a role by it's id.",
        subject: Role.name,
    },
    {
        action: RolesPermissionsEnum.DELETE_ROLE_BY_iD,
        function: "Deleting a role by it's id.",
        subject: Role.name,
    },
];
