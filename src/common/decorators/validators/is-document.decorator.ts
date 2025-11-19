import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

import { DocumentType } from '@generated/prisma/enums'

@ValidatorConstraint({ async: false })
class IsDocumentConstraint implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments): boolean {
    if (typeof value !== 'string') return false

    const dto = args.object as { document: string; documentType: DocumentType }
    const valueWithoutMask = value.replace(/\D/g, '')
    const cleanMask = args?.constraints?.[0] !== false

    const validators = {
      CPF: this.isValidCPF(valueWithoutMask),
      CNPJ: this.isValidCNPJ(valueWithoutMask),
    }

    const isValid = validators[dto.documentType] || false

    if (isValid && cleanMask) {
      const obj = args.object as Record<string, string>
      obj[args.property] = valueWithoutMask
    }

    return isValid
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} is invalid`
  }

  private isValidCPF(cpf: string): boolean {
    if (cpf.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cpf)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) sum += +cpf[i] * (10 - i)
    let firstDigit = (sum * 10) % 11
    if (firstDigit === 10) firstDigit = 0
    if (firstDigit !== +cpf[9]) return false

    sum = 0
    for (let i = 0; i < 10; i++) sum += +cpf[i] * (11 - i)
    let secondDigit = (sum * 10) % 11
    if (secondDigit === 10) secondDigit = 0

    return secondDigit === +cpf[10]
  }

  private isValidCNPJ(cnpj: string): boolean {
    if (cnpj.length !== 14) return false
    if (/^(\d)\1{13}$/.test(cnpj)) return false

    const calcCheckDigit = (base: string, weights: number[]) =>
      base.split('').reduce((sum, num, i) => sum + +num * weights[i], 0) % 11

    const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const secondWeights = [6, ...firstWeights]

    const base = cnpj.slice(0, 12)
    let digit1 = calcCheckDigit(base, firstWeights)
    digit1 = digit1 < 2 ? 0 : 11 - digit1

    let digit2 = calcCheckDigit(base + digit1, secondWeights)
    digit2 = digit2 < 2 ? 0 : 11 - digit2

    return cnpj.endsWith(`${digit1}${digit2}`)
  }
}

export function IsDocument(cleanMask = true, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsDocument',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [cleanMask],
      validator: IsDocumentConstraint,
    })
  }
}
