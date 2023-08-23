import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols";

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string,
  ) {}
  validate(input: Record<string, string>): Error | null {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null;
  }
}
