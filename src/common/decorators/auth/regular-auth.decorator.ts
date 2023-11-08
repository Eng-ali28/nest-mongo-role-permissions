import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt.guard';

export default function Auth() {
    return applyDecorators(UseGuards(JwtAuthGuard));
}
