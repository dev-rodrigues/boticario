import ErrorDTO from "./ErrorDTO";

class ValidationError {
  public readonly errors: ErrorDTO[];

  public readonly statusCode: number;

  constructor(errors:ErrorDTO[], statusCode: number) {
    this.errors = errors;
    this.statusCode = statusCode;
  }
}

export default ValidationError;