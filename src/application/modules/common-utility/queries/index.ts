export * from "./list-countries/list-countries.query";
export * from "./search-countries/search-countries.query";
export * from "./list-states/list-states.query";
export * from "./search-states/search-states.query";
export * from "./list-cities/list-cities.query";
export * from "./search-cities/search-cities.query";
export * from "./list-currencies/list-currencies.query";
export * from "./search-currencies/search-currencies.query";
export * from "./list-languages/list-languages.query";
export * from "./search-languages/search-languages.query";

import { ListCountriesQueryHandler } from "./list-countries/list-countries.query-handler";
import { SearchCountriesQueryHandler } from "./search-countries/search-countries.query-handler";
import { ListStatesQueryHandler } from "./list-states/list-states.query-handler";
import { SearchStatesQueryHandler } from "./search-states/search-states.query-handler";
import { ListCitiesQueryHandler } from "./list-cities/list-cities.query-handler";
import { SearchCitiesQueryHandler } from "./search-cities/search-cities.query-handler";
import { ListCurrenciesQueryHandler } from "./list-currencies/list-currencies.query-handler";
import { SearchCurrenciesQueryHandler } from "./search-currencies/search-currencies.query-handler";
import { ListLanguagesQueryHandler } from "./list-languages/list-languages.query-handler";
import { SearchLanguagesQueryHandler } from "./search-languages/search-languages.query-handler";

export const CommonUtilityQueryHandlers = [
  ListCountriesQueryHandler,
  SearchCountriesQueryHandler,
  ListStatesQueryHandler,
  SearchStatesQueryHandler,
  ListCitiesQueryHandler,
  SearchCitiesQueryHandler,
  ListCurrenciesQueryHandler,
  SearchCurrenciesQueryHandler,
  ListLanguagesQueryHandler,
  SearchLanguagesQueryHandler,
];
