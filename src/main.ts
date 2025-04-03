import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', 
    allowedHeaders: 'Content-Type, Accept, Authorization', 
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe(
    {
      transform:true,
      whitelist:true
    }
  ))
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
