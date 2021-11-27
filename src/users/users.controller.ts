import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.usersService.addUser(user);
  }

  @Get(":id")
  getUser(@Param("id", ParseIntPipe) id: number): Promise<UserDto> {
    return this.usersService.findUserById(id);
  }

  @Patch(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() user
  ): Promise<UserDto> {
    return this.usersService.updateUser(id, user);
  }
}
