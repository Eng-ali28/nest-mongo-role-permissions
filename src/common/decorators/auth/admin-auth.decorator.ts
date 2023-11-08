import { UseGuards, applyDecorators } from '@nestjs/common';
import AdminGuard from 'src/modules/auth/guards/isAdmin.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

export default function AdminAuth() {
    return applyDecorators(UseGuards(JwtAuthGuard, AdminGuard));
}
