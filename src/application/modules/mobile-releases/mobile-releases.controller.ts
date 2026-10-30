import { Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthenticatedUser, ClerkAuthGuard, CurrentUser } from '../../../common';
import { MobileReleaseService } from './mobile-release.service';
import { MobileReleaseDownload, MobileReleaseMetadata } from './mobile-release.types';

@ApiBearerAuth()
@ApiTags('Mobile Releases')
@Controller({ path: 'mobile-releases', version: '1' })
@UseGuards(ClerkAuthGuard)
export class MobileReleasesController {
  constructor(private readonly releases: MobileReleaseService) {}

  @Get('latest')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get metadata for the latest approved Android release' })
  @ApiOkResponse({ description: 'Latest release metadata without private storage details' })
  public getLatest(@CurrentUser() user: AuthenticatedUser): Promise<MobileReleaseMetadata> {
    this.assertOnboarded(user);
    return this.releases.getLatest();
  }

  @Post('latest/download')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @ApiOperation({ summary: 'Create a short-lived download URL for the latest Android APK' })
  @ApiOkResponse({ description: 'Five-minute private object download URL' })
  public createDownload(@CurrentUser() user: AuthenticatedUser): Promise<MobileReleaseDownload> {
    this.assertOnboarded(user);
    return this.releases.createDownload();
  }

  private assertOnboarded(user: AuthenticatedUser): void {
    if (!user?.isOnboarded) throw new ForbiddenException('An active ERP account is required to download the app');
  }
}
