import { IsDateString, IsEmail, ValidateIf } from "class-validator";
import { IsNotBlank } from "../../commons/validation/validators";

export class UserDto {
  id: number;
  @IsNotBlank()
  name: string;
  @IsNotBlank()
  surname: string;
  @IsDateString()
  @ValidateIf((o) => o.dateOfBirth != null)
  dateOfBirth: string;
  @IsEmail()
  email: string;
  @IsNotBlank()
  password: string;
}
