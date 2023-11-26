import { EntityRepository } from 'src/common';
import { Code } from './schemas/code.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { VerifyCodeDto } from './dto/verify-code.dto';

@Injectable()
export class CodeRepository extends EntityRepository<Code> {
    constructor(@InjectModel(Code.name) private readonly CodeModel: Model<Code>) {
        super(CodeModel);
    }

    async findActiveCode(phoneNumber: string) {
        const code = await this.CodeModel.findOne({ phoneNumber, active: true });

        if (!code) return false;

        await this.CodeModel.deleteOne({ phoneNumber });

        return true;
    }

    async findCodeByPhoneNumberAndOtp(verifyCodeDto: VerifyCodeDto) {
        const findCode = await this.CodeModel.findOne({
            phoneNumber: verifyCodeDto.phoneNumber,
            otp: verifyCodeDto.otp,
        });
        return findCode;
    }
}
