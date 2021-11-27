import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { TypeOrmErrorFilter } from "./commons/exceptions/filters/TypeOrmErrorFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new TypeOrmErrorFilter());
  await app.listen(3000);
}

bootstrap();
