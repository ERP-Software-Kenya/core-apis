import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonUtilityController } from './common-utility.controller';
import { CommonUtilityQueryHandlers } from './queries';
import { CommonUtilityCommandHandlers } from './commands';
import { CommonUtilityProfile } from './mapper';
import {
  CountryFeatureOptions, StateFeatureOptions, CityFeatureOptions,
  CurrencyFeatureOptions, LanguageFeatureOptions,
} from './options';
import {
  CountryFilterNormalizer, StateFilterNormalizer, CityFilterNormalizer,
  CurrencyFilterNormalizer, LanguageFilterNormalizer,
} from './helpers';

@Module({
  imports: [CqrsModule],
  controllers: [CommonUtilityController],
  providers: [
    ...CommonUtilityQueryHandlers,
    ...CommonUtilityCommandHandlers,
    CommonUtilityProfile,
    CountryFeatureOptions,
    CountryFilterNormalizer,
    StateFeatureOptions,
    StateFilterNormalizer,
    CityFeatureOptions,
    CityFilterNormalizer,
    CurrencyFeatureOptions,
    CurrencyFilterNormalizer,
    LanguageFeatureOptions,
    LanguageFilterNormalizer,
  ],
})
export class CommonUtilityModule {}
