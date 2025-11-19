import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

export function IsStringNotBlank(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsStringNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [propertyName],
      options: validationOptions,
      validator: {
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should not be blank`
        },
        validate(value: string) {
          return typeof value === 'string' && value.trim().length > 0
        },
      },
    })
  }
}
