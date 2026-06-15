import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidTransactionTypes } from 'src/transactions/interfaces/ValidTransactionTypes';

@Injectable()
export class ParseTransactionTypePipe implements PipeTransform {
  transform(value: ValidTransactionTypes, metadata: ArgumentMetadata) {
    return value;
  }
}
