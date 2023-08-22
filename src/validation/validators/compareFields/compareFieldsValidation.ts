import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols";

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string,
  ) {}
  validate(value: string): Error | null {
    return new InvalidFieldError();
  }
}
