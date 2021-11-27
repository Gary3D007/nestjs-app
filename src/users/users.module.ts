import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.controller";
import { UsersMapper } from "./users.mapper";
import { UsersRepository } from "./users.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UsersService, UsersMapper],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
