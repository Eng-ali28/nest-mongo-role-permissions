import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Lang } from '../dto/paginate.dto';
import { Observable, map } from 'rxjs';
import mongoose from 'mongoose';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = ctx.switchToHttp().getRequest() as Request;
        const lang = (request.query.lang as string) || Lang.ENGLISH;
        return next.handle().pipe(
            map((data) => {
                if (Array.isArray(data) && data.length !== 0) {
                    data = data.map((obj) => {
                        return this.handleObject(obj, lang);
                    });
                } else if (typeof data == 'object') {
                    data = this.handleObject(data, lang);
                }
                return data;
            }),
        );
    }

    handleObject(obj: object, lang: string) {
        let jsObject = obj instanceof mongoose.Document ? obj.toObject() : obj;
        if (Object.keys(jsObject).length > 0) {
            for (let key in jsObject) {
                if (!jsObject[key]) {
                    continue;
                } else if (typeof jsObject[key] == 'object' && Object.keys(jsObject[key]).length > 0) {
                    this.handleObject(jsObject[key], lang);
                } else if (Array.isArray(jsObject[key]) && jsObject[key].length > 0) {
                    for (let i = 0; i < jsObject[key].length; i++) {
                        this.handleObject(jsObject[key][i], lang);
                    }
                } else if (typeof jsObject[key] == 'string') {
                    const pureField = this.checkIfLocalsField(key, lang);
                    if (pureField) {
                        const pureFieldValue = jsObject[key];
                        delete jsObject[key];
                        jsObject[pureField] = pureFieldValue;
                    } else if (key.split('_').includes(Lang.ARABIC) || key.split('_').includes(Lang.ENGLISH)) {
                        delete jsObject[key];
                    }
                }
            }
        }
        return jsObject;
    }

    checkIfLocalsField(key: string, lang: string): string {
        const splitField = key.split('_');
        if (splitField.length > 1 && splitField[1] == lang) return splitField[0];
        return '';
    }
}
