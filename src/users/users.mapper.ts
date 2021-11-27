import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UsersMapper {
  toDto(user: User): UserDto {
    const result = new UserDto();
    result.id = user.id;
    result.name = user.name;
    result.surname = user.surname;
    result.password = "******";
    result.email = user.email;
    result.dateOfBirth = user.dateOfBirth?.toDateString();
    return result;
  }

  fromDto(userDto: CreateUserDto): User {
    const result = new User();
    result.name = userDto.name;
    result.surname = userDto.surname;
    result.dateOfBirth = new Date(userDto.dateOfBirth);
    result.email = userDto.email;
    result.password = userDto.password;
    return result;
  }
}
