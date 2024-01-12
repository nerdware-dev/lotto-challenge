import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class NumberService {
  public generateRandomNumberInRange(start: number, end: number): number {
    return crypto.randomInt(start, end + 1);
  }
}
