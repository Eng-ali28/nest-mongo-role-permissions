import { applyDecorators, UseGuards } from '@nestjs/common';

import { Permissions } from './permissions-decorator';

import { PermissionsGuard } from 'src/modules/auth/guards/permissions.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

export function Auth(...permission: string[]) {
    return applyDecorators(Permissions(permission), UseGuards(JwtAuthGuard, PermissionsGuard));
}
