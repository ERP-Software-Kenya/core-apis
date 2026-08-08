import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonUtilityController } from './common-utility.controller';
import { CommonUtilityQueryHandlers } from './queries';
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
