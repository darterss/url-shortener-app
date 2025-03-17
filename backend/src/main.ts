import { NestFactory } from '@nestjs/core';
import { UrlModule } from './url/url.module.js';

async function bootstrap() {
  const app = await NestFactory.create(UrlModule);
  app.enableCors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
