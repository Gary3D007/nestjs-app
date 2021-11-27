import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserDto } from "./dto/user.dto";
import { UsersMapper } from "./users.mapper";
import { UsersRepository } from "./users.repository";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersMapper: UsersMapper
  ) {}

  async addUser(userDto: CreateUserDto): Promise<UserDto> {
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const savedUser = await this.usersRepository.save(userDto);
    return this.usersMapper.toDto(savedUser);
  }

  findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { email } });
  }

  async findUserById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOneOrFail(id);
    return this.usersMapper.toDto(user);
  }

  async updateUser(id: number, user: UserDto): Promise<UserDto> {
    const userToUpdate: User = this.usersMapper.fromDto(user);

    const updatedUser = await this.usersRepository.updateAndReturnUpdated(
      id,
      userToUpdate
    );

    return this.usersMapper.toDto(updatedUser);
  }
}
