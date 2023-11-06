import { Request } from 'express';
import { Payload } from './payload.types';

export enum USER {
  ID = 'userId',
  EMAIL = 'email',
}

export interface AuthRequest extends Request {
  user: Payload;
}
