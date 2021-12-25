import { RequestResult } from "./../../schemas/RequestResultSchema";
import { api } from "../../config/Apis";
import { createRequestResult } from "../factories/RequestResultFactory";

export async function createTeamRequest(
  name: string,
  admin: { username: string; password: string }
): Promise<RequestResult<string>> {
  try {
    const response = await api.post("/team", {
      name,
      admin,
    });

    return createRequestResult(true, { data: response.data });
  } catch (error: any) {
    return createRequestResult(false, { error: error.response.data });
  }
}
