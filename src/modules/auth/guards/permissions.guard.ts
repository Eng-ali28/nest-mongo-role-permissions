import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/modules/users/users.service';
import { AuthRequest } from '../types/authUser.types';
import { Permission } from 'src/common';
import TranslateException from 'src/common/util/translate.exciption.service';
import { AuthService } from '../auth.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService,
        private readonly translateExceptionService: TranslateException,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as AuthRequest;

        // Getting the permission from decorator:
        const receivedPermissions = this.reflector.get<Permission[]>('permissions', context.getHandler());

        // Getting user:
        let permissions = await this.authService.getUserPermissionsByUserId(request.user.userId);

        const isAuthorizaed = receivedPermissions.some((item) => (permissions as Permission[]).includes(item));

        if (isAuthorizaed) return true;
        else this.translateExceptionService.I18nUnauthorizedException();
    }
}
