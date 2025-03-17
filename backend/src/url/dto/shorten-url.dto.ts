export class ShortenUrlDto {
    originalUrl: string;
    alias?: string;
    expiresAt?: Date;

    constructor(originalUrl: string, alias?: string, expiresAt?: Date) {
        this.originalUrl = originalUrl;
        this.alias = alias;
        this.expiresAt = expiresAt;
    }
}
