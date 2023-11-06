import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { UsersModule } from '../users/users.module';
import { CodeRepository } from './code.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Code, CodeSchema } from './schemas/code.schema';

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{ name: Code.name, schema: CodeSchema }])],
    controllers: [CodeController],
    providers: [CodeService, CodeRepository],
    exports: [CodeService, CodeRepository],
})
export class CodeModule {}
