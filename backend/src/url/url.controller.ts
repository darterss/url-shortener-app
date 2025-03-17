import { Body, Controller, Delete, Get, Param, Post, Req, Redirect } from '@nestjs/common';
import { UrlService } from './url.service.js';
import { ShortenUrlDto } from './dto/shorten-url.dto.js';

@Controller()
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Post('shorten')
    shorten(@Body() dto: ShortenUrlDto) {
        return this.urlService.createShortUrl(dto);
    }

    @Get(':shortUrl')
    @Redirect()
    redirect(@Param('shortUrl') shortUrl: string, @Req() req) {
        return this.urlService.redirectToOriginal(shortUrl, req.ip);
    }

    @Get('info/:shortUrl')
    info(@Param('shortUrl') shortUrl: string) {
        return this.urlService.getUrlInfo(shortUrl);
    }

    @Delete('delete/:shortUrl')
    delete(@Param('shortUrl') shortUrl: string) {
        return this.urlService.deleteShortUrl(shortUrl);
    }

    @Get('analytics/:shortUrl')
    analytics(@Param('shortUrl') shortUrl: string) {
        return this.urlService.getAnalytics(shortUrl);
    }
}
