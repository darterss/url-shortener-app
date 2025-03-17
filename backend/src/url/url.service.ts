import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ShortenUrlDto } from './dto/shorten-url.dto.js';
import { generateBase62Id } from '../utils/generateBase62Id.js';

@Injectable()
export class UrlService {
    constructor(private prisma: PrismaService) {}

    async createShortUrl(dto: ShortenUrlDto) {
        let alias: string
        let existing: boolean
        let n = 0
        do {
            alias = dto.alias || generateBase62Id(8);

            existing = !!await this.prisma.url.findUnique({ where: { alias } })

            const isExpired = dto.expiresAt && dto.expiresAt < new Date()

            if (existing && dto.alias && !isExpired) throw new HttpException(
              { message: 'Алиас уже используется' },
              HttpStatus.BAD_REQUEST,
            );

            if (existing && isExpired) {
                await this.deleteShortUrl(alias)
            }
            if (n === 10) throw new HttpException(
              { message: 'Максимальное количество генераций ссылки' },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
            n++
        } while (existing)

        const shortUrl = alias;

        const url = await this.prisma.url.create({
            data: {
                originalUrl: dto.originalUrl,
                shortUrl,
                alias: dto.alias,
                expiresAt: dto.expiresAt,
            },
        });

        return { shortUrl: `http://localhost:3000/${url.shortUrl}` };
    }

    async redirectToOriginal(shortUrl: string, ip: string) {
        const url = await this.prisma.url.findUnique({ where: { shortUrl } });
        if (!url || (url.expiresAt && url.expiresAt < new Date())) throw new NotFoundException();

        await this.prisma.url.update({
            where: { shortUrl },
            data: { clickCount: { increment: 1 }, clicks: { create: { ipAddress: ip } } },
        });

        return { url: url.originalUrl };
    }

    async getUrlInfo(shortUrl: string) {
        const url = await this.prisma.url.findUnique({ where: { shortUrl } });
        if (!url) throw new NotFoundException();
        return url;
    }

    async deleteShortUrl(shortUrl: string) {
        const url = await this.prisma.url.findUnique({
            where: { shortUrl },
        });

        if (!url) {
            throw new NotFoundException('URL not found');
        }

        // Удаляем ссылку (клики удалятся автоматически благодаря onDelete: Cascade)
        await this.prisma.url.delete({
            where: { shortUrl },
        });

        return { message: 'URL and related clicks deleted' };
    }


    async getAnalytics(shortUrl: string) {
        const clicks = await this.prisma.click.findMany({
            where: { url: { shortUrl } },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        const url = await this.prisma.url.findUnique({ where: { shortUrl } });
        if (!url) throw new NotFoundException();
        return { clickCount: url?.clickCount, recentClicks: clicks };
    }
}
