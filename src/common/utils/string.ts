import { replace } from "lodash";

export const removeSpaces = (str: string): string => replace(str, /\s/g, "");

/**
 * Adds spaces to a string between capitalized letters.
 *
 * @param str The string to add spaces to.
 * @returns The string with spaces between capitalized letters.
 */
export const addSpaces = (str: string): string => replace(str, /([A-Z])/g, " $1").trim();
