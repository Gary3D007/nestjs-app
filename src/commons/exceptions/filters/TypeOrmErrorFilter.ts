import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus
} from "@nestjs/common";
import { Response } from "express";

import { EntityNotFoundError, TypeORMError } from "typeorm";

@Catch(TypeORMError)
export class TypeOrmErrorFilter implements ExceptionFilter<TypeORMError> {
  catch(exception: TypeORMError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof EntityNotFoundError) {
      statusCode = HttpStatus.BAD_REQUEST;
    }

    response.status(statusCode).json({
      statusCode,
      message: exception.message
    });
  }
}
