import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmsModule } from "./films/films.module";
import { getConnectionOptions } from "typeorm";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CaslModule } from "./casl/casl.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), { autoLoadEntities: true })
    }),
    FilmsModule,
    ReviewsModule,
    AuthModule,
    UsersModule,
    CaslModule
  ]
})
export class AppModule {}
