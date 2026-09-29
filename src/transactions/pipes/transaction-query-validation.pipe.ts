import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RawTransactionQueries } from '../interfaces/RawTransactionQueries';
import { ValidTransactionQueries } from '../interfaces/ValidTransactionQueries';

@Injectable()
export class ParseTransactionQueryPipe implements PipeTransform<
  RawTransactionQueries,
  ValidTransactionQueries
> {
  transform(
    value: RawTransactionQueries,
    metadata: ArgumentMetadata,
  ): ValidTransactionQueries {
    const limit = +value.limit;
    const offset = +value.offset;
    if (isNaN(limit) || isNaN(offset))
      throw new BadRequestException('queries must be numbers');
    if (limit <= 0)
      throw new BadRequestException('limit must be greater than 0');
    return {
      limit,
      offset,
    };
  }
}
