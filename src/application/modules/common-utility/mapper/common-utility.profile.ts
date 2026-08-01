import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CountryEntity, StateEntity, CityEntity, CurrencyEntity, LanguageEntity } from '../../../../infrastructure/persistence/entities';
import { Country, State, City, Currency, Language } from '../domain';
import {
  ListCountriesRequest, SearchCountriesRequest,
  ListStatesRequest, SearchStatesRequest,
  ListCitiesRequest, SearchCitiesRequest,
  ListCurrenciesRequest, SearchCurrenciesRequest,
  ListLanguagesRequest, SearchLanguagesRequest,
  CountryResponse, StateResponse, CityResponse, CurrencyResponse, LanguageResponse,
} from '../models';
import {
  ListCountriesQuery, SearchCountriesQuery,
  ListStatesQuery, SearchStatesQuery,
  ListCitiesQuery, SearchCitiesQuery,
  ListCurrenciesQuery, SearchCurrenciesQuery,
  ListLanguagesQuery, SearchLanguagesQuery,
} from '../queries';

@Injectable()
export class CommonUtilityProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public override get profile() {
    return (mapper: Mapper) => {
      // Requests -> Queries
      createMap(mapper, ListCountriesRequest, ListCountriesQuery);
      createMap(mapper, SearchCountriesRequest, SearchCountriesQuery);
      createMap(mapper, ListStatesRequest, ListStatesQuery);
      createMap(mapper, SearchStatesRequest, SearchStatesQuery);
      createMap(mapper, ListCitiesRequest, ListCitiesQuery);
      createMap(mapper, SearchCitiesRequest, SearchCitiesQuery);
      createMap(mapper, ListCurrenciesRequest, ListCurrenciesQuery);
      createMap(mapper, SearchCurrenciesRequest, SearchCurrenciesQuery);
      createMap(mapper, ListLanguagesRequest, ListLanguagesQuery);
      createMap(mapper, SearchLanguagesRequest, SearchLanguagesQuery);

      // Entities -> Domains (used by repos)
      createMap(mapper, CountryEntity, Country);
      createMap(mapper, StateEntity, State);
      createMap(mapper, CityEntity, City);
      createMap(mapper, CurrencyEntity, Currency);
      createMap(mapper, LanguageEntity, Language);

      // Domains -> Responses (used by controller)
      createMap(mapper, Country, CountryResponse);
      createMap(mapper, State, StateResponse);
      createMap(mapper, City, CityResponse);
      createMap(mapper, Currency, CurrencyResponse);
      createMap(mapper, Language, LanguageResponse);
    };
  }
}
