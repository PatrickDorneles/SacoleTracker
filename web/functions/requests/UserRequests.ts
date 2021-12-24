import { UserSchema } from "../../schemas/UserSchema";
import { api } from "../../config/Apis";
import { createRequestResult } from "../factories/RequestResultFactory";
import { RequestResult } from "../../schemas/RequestResultSchema";

export async function verifyUserRequest(url: string, token: string) {
  const response = await api.get<UserSchema | undefined>(url, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
}

export async function signInRequest(
  username: string,
  password: string
): Promise<RequestResult<{ token: string }>> {
  try {
    const response = await api.post<{ token: string }>("signin", {
      username,
      password,
    });

    return createRequestResult<{ token: string }>(true, {
      data: response.data,
    });
  } catch (error: any) {
    return createRequestResult(false, {
      error: error.response.data,
    });
  }
}
