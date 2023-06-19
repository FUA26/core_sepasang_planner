import { IsInt, IsString, IsEmail, IsBoolean, IsDate } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

function toDate(value: TransformFnParams): Date {
  return new Date(value.value);
}
export class UserDTO {
  @IsInt()
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isActive: number;

  @IsDate()
  @Transform(toDate)
  date_created: Date;

  @IsDate()
  @Transform(toDate)
  date_updated: Date;
}
