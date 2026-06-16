import { H3Event, HTTPError } from "h3";
import type { GithubUser } from "../models/github.model.ts";
import { GithubService } from "../services/github.service.ts";
import type { HttpResponse } from "../models/http.model.ts";
import { useAsync } from "@oricardopestana/ts-utils";

export async function handleUserStats() {
  const [[userData, userDataError], [userRepos, userReposError]] = await Promise.all([
    useAsync<HttpResponse<GithubUser>, FetchError>(() => GithubService.fetchUserData()),
    useAsync<HttpResponse<unknown>, FetchError>(() => GithubService.fetchUserRepos()),
  ]);
  if (userDataError || userReposError)
    throw new HTTPError(userDataError?.statusMessage ?? userReposError?.statusMessage ?? "Error", {
      status: userDataError?.statusCode ?? userReposError?.statusCode,
    });
  return { userData, userRepos };
}
