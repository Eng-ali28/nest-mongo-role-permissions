import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export default class HashService {
    async hashData(data: string) {
        return await argon2.hash(data);
    }

    async isMatchHashed(hash: string, current: string): Promise<boolean> {
        const isMatch = await argon2.verify(hash, current);
        return isMatch;
    }
}
