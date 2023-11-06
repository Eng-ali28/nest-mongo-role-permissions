import { BadRequestException, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';

const tenMbyte = 10485760;
export const ImageProcessingFactory = (isRequired: boolean) => [
    new ParseFilePipe({
        fileIsRequired: isRequired,
        validators: [
            new MaxFileSizeValidator({ maxSize: tenMbyte, message: `You can't upload image with size more than 10mb` }),
        ],
        exceptionFactory: (error) => {
            throw new BadRequestException(error);
        },
    }),
];
