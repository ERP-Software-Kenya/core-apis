import { join, map, split, toLower, trim, upperFirst } from "lodash";

export const capitalizeFirstLetter = (word: string): string => {
  return upperFirst(toLower(word));
};

export const capitalizeEachWord = (sentence: string): string => {
  return join(
    map(split(trim(sentence), " "), (word) => capitalizeFirstLetter(word)),
    " ",
  );
};
