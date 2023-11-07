import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class ParseMongoIdPipe implements PipeTransform {
    transform(value: string) {
        const isValidObjectId = Types.ObjectId.isValid(value);
        if (!isValidObjectId) throw new BadRequestException('Id must be a valid Mongo Id.');

        return value;
    }
}
