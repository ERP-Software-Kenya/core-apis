import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BranchesController } from './branches.controller';
import { BranchCommandHandlers } from './commands';
import { BranchQueryHandlers } from './queries';
import { BranchProfile } from './mapper';
import { BranchFeatureOptions } from './options';
import { BranchFilterNormalizer } from './helpers';

@Module({
  imports:     [CqrsModule],
  controllers: [BranchesController],
  providers:   [
    ...BranchCommandHandlers,
    ...BranchQueryHandlers,
    BranchProfile,
    BranchFeatureOptions,
    BranchFilterNormalizer,
  ],
})
export class BranchesModule {}
