import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoriesController } from './categories.controller';
import { CategoryProfile } from './mapper';
import { CategoryFeatureOptions } from './options';
import { CategoryFilterNormalizer } from './helpers';
import { CategoryCommandHandlers } from './commands';
import { CategoryQueryHandlers } from './queries';

@Module({
  imports:     [CqrsModule],
  controllers: [CategoriesController],
  providers:   [
    ...CategoryCommandHandlers,
    ...CategoryQueryHandlers,
    CategoryProfile,
    CategoryFeatureOptions,
    CategoryFilterNormalizer,
  ],
})
export class CategoriesModule {}
