import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ name: "IsNotBlank", async: false })
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === "string" && value.trim().length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should not be empty`;
  }
}

export function IsNotBlank() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {},
      validator: IsNotBlankConstraint
    });
  };
}
