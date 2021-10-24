import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmsModule } from "./films/films.module";
import { getConnectionOptions } from "typeorm";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), { autoLoadEntities: true })
    }),
    FilmsModule,
    ReviewsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
