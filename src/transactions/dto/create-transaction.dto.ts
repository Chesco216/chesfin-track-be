import {
  IsDate,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ValidTransactionTypes } from '../interfaces/ValidTransactionTypes';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsEnum(ValidTransactionTypes)
  type: ValidTransactionTypes;

  @MinLength(2)
  @IsString()
  description: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  category: string;
}
