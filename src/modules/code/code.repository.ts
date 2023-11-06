import { EntityRepository } from 'src/common';
import { Code } from './schemas/code.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeRepository extends EntityRepository<Code> {
    constructor(@InjectModel(Code.name) private readonly CodeModel: Model<Code>) {
        super(CodeModel);
    }

    async findActiveCode(email: string) {
        const code = await this.CodeModel.findOne({ email, active: true });

        if (!code) return false;

        await this.CodeModel.deleteOne({ email });

        return true;
    }
}
