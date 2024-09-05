import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEmpty,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { Order } from 'src/entities/orders.entity';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty({ description: 'UUID asigando por la DB' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    description: 'User name, must be at least 3 characters',
    example: 'example name',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email, must have email format',
    example: 'exampleEmail@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword()
  @ApiProperty({
    description:
      'User password. Must be at least 8 characters long and 15 max. Must have 1 uppercase letter, one number and one special character (?!@#$)',
    example: 'Example1!',
  })
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  @ApiProperty({
    description: 'User confirm password, must match password',
    example: 'Example1!',
  })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    description: 'User address, 3 char min and 80 max',
    example: 'Example street 55',
  })
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'User phone, number with no spaces',
    example: 555555555,
  })
  phone: number;

  @IsNotEmpty()
  @MinLength(4) // Peru
  @MaxLength(50)
  @ApiProperty({
    description: 'User country, must be at least 4 characters long and 20 max ',
    example: ' Example country',
  })
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({
    description: 'User city, must be at least 5 characters long and 20 max ',
    example: ' Example city',
  })
  city: string;

  @IsEmpty()
  @ApiProperty({
    description:
      'Authorization to admin privilegies, not submitable by user. Set to false by default',
    example: false,
  })
  isAdmin?: boolean;

  @IsNotEmpty()
  @ApiProperty()
  birthdate: Date;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description:
      ' Array of orderd done by user. Empty by default until users begins and order',
  })
  orders: Partial<Order[]>;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'Updated user name, must be at least 3 characters',
    example: 'Updated name',
  })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword()
  @ApiProperty({
    description:
      'Updated user password. Must be at least 8 characters long and 15 max. Must have 1 uppercase letter, one number and one special character (?!@#$)',
    example: 'NewPass2!',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description: 'Updated user address, 3 char min and 80 max',
    example: 'Updated street 66',
  })
  address: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Updated user phone, number with no spaces',
    example: 666666666,
  })
  phone: number;

  @IsOptional()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description:
      'Updated user country, must be at least 4 characters long and 20 max ',
    example: ' Updated country',
  })
  country: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty({
    description:
      'Updated user city, must be at least 5 characters long and 20 max ',
    example: ' Updated city',
  })
  city: String;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {} //libreria swagger
