import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from 'src/modules/permissions/permissions.service';
import { RolesService } from 'src/modules/role/roles.service';
import { UsersService } from 'src/modules/users/users.service';


@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly usersService: UsersService, 
        private readonly permissionsService: PermissionsService,
        private readonly rolesService: RolesService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('We are in our guard.');
        // Getting the permission from decorator:
        const receivedPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        console.log(receivedPermissions);

        // Getting user:
        let user = request.user;
        console.log(user);

        return true;

    }

}