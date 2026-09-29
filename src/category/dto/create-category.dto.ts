import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(8)
  icon: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(8)
  color: number;
}
