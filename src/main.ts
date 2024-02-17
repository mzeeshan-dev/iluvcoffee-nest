import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove any other fields that are not part of the DTO
      forbidNonWhitelisted: true, // throw an error if any other fields are present
      transform: true, // transform the incoming data to the DTO type
      transformOptions: {
        enableImplicitConversion: true, // convert incoming data to the type defined in the DTO
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
