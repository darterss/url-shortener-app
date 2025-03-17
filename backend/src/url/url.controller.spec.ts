import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { NotFoundException } from '@nestjs/common';

describe('UrlController', () => {
  let controller: UrlController;
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [
        {
          provide: UrlService,
          useValue: {
            redirectToOriginal: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UrlController>(UrlController);
    service = module.get<UrlService>(UrlService);
  });

  it('should redirect to the original URL if shortUrl exists', async () => {
    const shortUrl = 'abc123';
    const originalUrl = 'https://example.com';
    const req = { ip: '127.0.0.1' }; // Мок

    // Мок
    (service.redirectToOriginal as jest.Mock).mockResolvedValue({ url: originalUrl });

    // Вызываем контроллер
    const result = await controller.redirect(shortUrl, req);

    // Проверяем, что сервис вызывался правильно
    expect(service.redirectToOriginal).toHaveBeenCalledWith(shortUrl, req.ip);

    // Проверяем, что возвращено именно то, что ожидает @Redirect()
    expect(result).toEqual({ url: originalUrl });
  });

  it('should throw NotFoundException if shortUrl does not exist', async () => {
    const shortUrl = 'non-existent-id';
    const req = { ip: '127.0.0.1' };

    // Мок
    (service.redirectToOriginal as jest.Mock).mockRejectedValue(new NotFoundException());

    // Проверяем, что контроллер тоже кидает исключение
    await expect(controller.redirect(shortUrl, req)).rejects.toThrow(NotFoundException);
    expect(service.redirectToOriginal).toHaveBeenCalledWith(shortUrl, req.ip);
  });
});
