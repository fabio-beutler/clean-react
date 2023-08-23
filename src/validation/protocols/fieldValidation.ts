export interface FieldValidation {
  field: string;
  validate(input: Record<string, string | number>): Error | null;
}
