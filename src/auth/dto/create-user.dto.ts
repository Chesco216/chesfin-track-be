import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?!.*\s)/, {
    message: 'Password cant contain white spaces',
    context: { id: 1 },
  })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])/, {
    message: 'Password must contain al least 1 uppercase and lowercase letter',
    context: { id: 2 },
  })
  @Matches(/(?=.*\d)/, {
    message: 'Password must contain at least 1 number',
    context: { id: 3 },
  })
  password: string;
}
