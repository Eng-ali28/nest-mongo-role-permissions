import { Permission } from "../types/permission.type";
import { PermissionsEnum } from "./permissions.enum";

export let permissions: Permission[] = [
    {
        action: PermissionsEnum.CREATE_PERMISSION,
        function: "Creating new permission.",
        subject: "Permissions"
    },
    {
        action: PermissionsEnum.GET_PERMISSION_BY_ID,
        function: "Getting a permission by it's id.",
        subject: "Permissions"
    },
    {
        action: PermissionsEnum.GET_PERMISSIONS,
        function: "Getting all permissions.",
        subject: "Permissions"
    },
    {
        action: PermissionsEnum.UPDATE_PERMISSION_BY_ID,
        function: "Updating a permission by it's id.",
        subject: "Permissions"
    },
    {
        action: PermissionsEnum.DELETE_PERMISSION_BY_iD,
        function: "Deleting a permission by it's id.",
        subject: "Permissions"
    },

]