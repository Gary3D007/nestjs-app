import { IsDateString, IsEmail, IsOptional } from "class-validator";
import { IsNotBlank } from "../../commons/validation/validators";

export class UserDto {
  id: number;
  @IsNotBlank()
  name: string;
  @IsNotBlank()
  surname: string;
  @IsDateString()
  @IsOptional()
  dateOfBirth: string;
  @IsEmail()
  email: string;
  @IsNotBlank()
  password: string;
}
