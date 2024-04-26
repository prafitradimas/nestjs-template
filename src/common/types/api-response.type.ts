import { HttpStatus } from '@nestjs/common';

type ResponseData<T> = T | null;
type ResponseError = {
  title: string;
  message: string;
  details?: any[];
};

export class ApiResponse<T> {
  success: boolean;

  code: number;

  message: string;

  results: ResponseData<T>;

  error: ResponseError;

  private constructor(args: Readonly<Partial<ApiResponse<T>>>) {
    this.success = args.success;
    this.code = args.code;
    this.message = args.message;
    this.results = args.results;
    this.error = args.error;
  }

  public static success<T>(args: Partial<ApiResponse<T>>) {
    args.success = true;
    args.code ??= HttpStatus.OK;
    return new ApiResponse<T>(args);
  }

  public static error<T>(args: Partial<ApiResponse<T>>) {
    args.success = false;
    args.code ??= HttpStatus.INTERNAL_SERVER_ERROR;
    return new ApiResponse<T>(args);
  }
}
