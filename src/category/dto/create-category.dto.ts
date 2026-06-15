import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
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
