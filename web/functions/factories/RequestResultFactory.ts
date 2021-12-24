import { RequestResult } from "../../schemas/RequestResultSchema";

export function createRequestResult<T>(
  success: boolean,
  result: {
    data?: T;
    error?: string;
  }
): RequestResult<T> {
  if (!success) {
    return { success, error: result.error! };
  }

  return {
    success,
    data: result.data!,
  };
}
