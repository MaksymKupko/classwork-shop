import { registerDecorator, ValidationOptions } from "class-validator";

export function IsCVV(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsCVV",
      target: object.constructor,
      propertyName,
      constraints: [propertyName],
      options: { message: "CVV must be an integer number of 3 digits", ...validationOptions },
      validator: {
        validate(value: number) {
          const cvvString = `${value}`;
          const regexp = /^[0-9]{3}$/;
          return typeof value === "number" && regexp.test(cvvString);
        },
      },
    });
  };
}
