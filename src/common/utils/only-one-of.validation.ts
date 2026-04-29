import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { isNilOrEmpty } from '..';

@ValidatorConstraint({ name: "OnlyOneOf", async: false })
export class OnlyOneOfConstraint implements ValidatorConstraintInterface {
  public validate(_: any, args: ValidationArguments): boolean {
    const obj = args.object as Record<string, any>;
    const props: string[] = args.constraints as string[];
    const present = props.filter((p) => !isNilOrEmpty(obj[p]));
    // valid when 0 or 1 provided, invalid when 2+ provided
    return present.length <= 1;
  }

  public defaultMessage(args: ValidationArguments): string {
    const props: string[] = args.constraints as string[];
    return `Provide only one of the following properties: ${props.join(", ")}.`;
  }
}

export function OnlyOneOf(propertyNames: string[], validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: object, propertyName: string | symbol): void {
    registerDecorator({
      name: "OnlyOneOf",
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: propertyNames,
      validator: OnlyOneOfConstraint,
    });
  };
}
