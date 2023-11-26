import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
    transform(value: string) {
        const isValidObjectId = Types.ObjectId.isValid(value);
        if (!isValidObjectId) throw new BadRequestException('Id must be a valid Mongo Id.');

        return value;
    }
}
