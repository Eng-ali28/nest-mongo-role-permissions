import { Permission } from 'src/common';
import { UsersPermissionsEnum } from './permissions.enum';
import { User } from '../schemas/user.schema';

export let permissionsForUser: Permission[] = [
    {
        action: UsersPermissionsEnum.CREATE_USER,
        function: 'Creating new user.',
        subject: User.name,
    },
    {
        action: UsersPermissionsEnum.GET_USER_BY_ID,
        function: "Getting a user by it's id.",
        subject: User.name,
    },
    {
        action: UsersPermissionsEnum.GET_USERS,
        function: 'Getting all users.',
        subject: User.name,
    },
    {
        action: UsersPermissionsEnum.UPDATE_USER_BY_ID,
        function: "Updating a user by it's id.",
        subject: User.name,
    },
    {
        action: UsersPermissionsEnum.DELETE_USER_BY_iD,
        function: "Deleting a user by it's id.",
        subject: User.name,
    },
];
