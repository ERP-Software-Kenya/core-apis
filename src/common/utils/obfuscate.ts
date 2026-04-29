const obfuscate = (string: string, unmaskedCharCount: number = 0): string => {
  if (string.length <= unmaskedCharCount) return string;
  const obfuscated = string.substring(0, string.length - unmaskedCharCount).replace(/[a-z\d]/gi, "*") + string.substring(string.length - unmaskedCharCount, string.length);
  return obfuscated;
};

export const obfuscateString = (string: string, unmaskedCharCount: number = 0): string => {
  const obfuscated = obfuscate(string, unmaskedCharCount);
  return obfuscated;
};

export const obfuscateNumber = (number: number, unmaskedCharCount: number = 0): string => {
  const string = number.toString();
  const obfuscated = obfuscate(string, unmaskedCharCount);
  return obfuscated;
};

export const obfuscateDate = (date: Date, unmaskedCharCount: number = 0): string => {
  const string = new Date(date).toISOString();
  const obfuscated = obfuscate(string, unmaskedCharCount);
  return obfuscated;
};

export const obfuscateEmail = (email: string, visibleChars = 0): string => {
  const atIndex = email.indexOf("@");
  const firstPart = email.slice(0, atIndex);
  const visiblePart = firstPart.slice(0, visibleChars);
  const hiddenPart = "*".repeat(firstPart.length - visibleChars);
  const domain = email.slice(atIndex);
  return visiblePart + hiddenPart + domain;
};
