import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('URL Shortener API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Добавляем валидации, если используешь class-validator
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  let shortUrl: string;
  const alias = 'my-custom-alias';
  const originalUrl = 'https://example.com';

  // Тест создания ссылки с alias
  it('POST /shorten - should create a short URL with custom alias', async () => {
    const response = await request(app.getHttpServer())
      .post('/shorten')
      .send({
        originalUrl,
        alias,
      })
      .expect(201);

    expect(response.body).toHaveProperty('shortUrl');
    expect(response.body.shortUrl).toContain(alias);
    shortUrl = response.body.shortUrl; // сохраняем для будущих тестов
  });

  // Тест редиректа
  it('GET /:shortUrl - should redirect to original URL', async () => {
    const urlPath = shortUrl.split('/').pop(); // получаем только alias/короткую часть

    const response = await request(app.getHttpServer())
      .get(`/${urlPath}`)
      .expect(302); // редирект

    expect(response.headers.location).toBe(originalUrl);
  });

  // Тест получения информации о ссылке
  it('GET /info/:shortUrl - should return URL info', async () => {
    const urlPath = shortUrl.split('/').pop();

    const response = await request(app.getHttpServer())
      .get(`/info/${urlPath}`)
      .expect(200);

    expect(response.body).toHaveProperty('originalUrl', originalUrl);
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('clickCount');
  });

  // Тест удаления ссылки
  it('DELETE /delete/:shortUrl - should delete the short URL', async () => {
    const urlPath = shortUrl.split('/').pop();

    await request(app.getHttpServer())
      .delete(`/delete/${urlPath}`)
      .expect(200);
  });

  // Проверка, что ссылка удалена
  it('GET /:shortUrl - should return 404 after deletion', async () => {
    const urlPath = shortUrl.split('/').pop();

    await request(app.getHttpServer())
      .get(`/${urlPath}`)
      .expect(404);
  });
});
