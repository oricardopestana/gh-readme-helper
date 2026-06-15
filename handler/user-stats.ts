import { H3Event, HTTPError } from "h3";
import type { GithubUser } from "../models/github.model.ts";
import { GithubService } from "../services/github.service.ts";
import type { HttpResponse } from "../models/http.model.ts";
import { useAsync } from "@oricardopestana/ts-utils";

export async function handleUserStats() {
  const [userData, error] = await useAsync<HttpResponse<GithubUser>, FetchError>(() => GithubService.fetchUserData());
  if (error) throw new HTTPError(error.statusMessage, { status: error.statusCode });
  console.log(userData);
  return userData;
}
