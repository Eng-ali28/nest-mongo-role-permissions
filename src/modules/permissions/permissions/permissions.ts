import { Permission } from 'src/common';
import { PermissionsEnum } from './permissions.enum';
import { Permissions } from '../schemas/permission.schema';

export let permissionsForPermissions: Permission[] = [
    {
        action: PermissionsEnum.CREATE_PERMISSION,
        function: 'Creating new permission.',
        subject: Permissions.name,
    },
    {
        action: PermissionsEnum.GET_PERMISSION_BY_ID,
        function: "Getting a permission by it's id.",
        subject: Permissions.name,
    },
    {
        action: PermissionsEnum.GET_PERMISSIONS,
        function: 'Getting all permissions.',
        subject: Permissions.name,
    },
    {
        action: PermissionsEnum.UPDATE_PERMISSION_BY_ID,
        function: "Updating a permission by it's id.",
        subject: Permissions.name,
    },
    {
        action: PermissionsEnum.DELETE_PERMISSION_BY_iD,
        function: "Deleting a permission by it's id.",
        subject: Permissions.name,
    },
];
