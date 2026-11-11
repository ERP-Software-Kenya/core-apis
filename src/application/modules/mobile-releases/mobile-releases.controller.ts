import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { MobileReleaseService } from './mobile-release.service';
import { MobileReleaseDownload, MobileReleaseMetadata } from './mobile-release.types';

@ApiTags('Mobile Releases')
@Controller({ path: 'mobile-releases', version: '1' })
export class MobileReleasesController {
  constructor(private readonly releases: MobileReleaseService) {}

  @Get('latest')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get metadata for the latest approved Android release' })
  @ApiOkResponse({ description: 'Latest release metadata without private storage details' })
  public getLatest(): Promise<MobileReleaseMetadata> {
    return this.releases.getLatest();
  }

  @Post('latest/download')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Create a short-lived download URL for the latest Android APK' })
  @ApiOkResponse({ description: 'Five-minute private object download URL' })
  public createDownload(): Promise<MobileReleaseDownload> {
    return this.releases.createDownload();
  }
}
