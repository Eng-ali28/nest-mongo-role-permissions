import { Permission } from 'src/common';
import { RolesPermissionsEnum } from './permissions.enum';

export let permissions: Permission[] = [
    {
        action: RolesPermissionsEnum.CREATE_ROLE,
        function: 'Creating new role.',
        subject: 'Permissions',
    },
    {
        action: RolesPermissionsEnum.GET_ROLE_BY_ID,
        function: "Getting a role by it's id.",
        subject: 'Permissions',
    },
    {
        action: RolesPermissionsEnum.GET_ROLES,
        function: 'Getting all roles.',
        subject: 'Permissions',
    },
    {
        action: RolesPermissionsEnum.UPDATE_ROLE_BY_ID,
        function: "Updating a role by it's id.",
        subject: 'Roles',
    },
    {
        action: RolesPermissionsEnum.DELETE_ROLE_BY_iD,
        function: "Deleting a role by it's id.",
        subject: 'Roles',
    },
];
