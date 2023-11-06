import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export default class TimeService {
    isToday(date: Date | string): boolean {
        if (moment(date).isSame(moment(), 'day')) return true;
        return false;
    }

    sameDay(firstDate: string, secondDate: Date): boolean {
        if (moment(moment(firstDate).add(3, 'hours').format()).isSame(moment(secondDate), 'day')) {
            return true;
        }
        return false;
    }

    now(): Date {
        return moment().add(3, 'hours').toDate();
    }
}
