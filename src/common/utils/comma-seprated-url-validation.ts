import { registerDecorator, ValidationOptions } from "class-validator";

export function IsCommaSeparatedUniqueUrls(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: "IsCommaSeparatedUniqueUrls",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value || typeof value !== "string") return true;
          const urls = value.split(",").map((url) => url.trim());
          const uniqueUrls = new Set(urls);
          if (uniqueUrls.size !== urls.length) return false;

          return urls.every((url) => {
            try {
              new URL(url);
              return true;
            } catch {
              return false;
            }
          });
        },
        defaultMessage(): string {
          return "Each value in the comma-separated string must be a valid URL, unique URLs";
        },
      },
    });
  };
}
