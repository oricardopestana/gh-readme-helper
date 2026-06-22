import { H3Event, HTTPError } from "h3";
import type { GithubUser, GithubUserRepo } from "../models/github.model.ts";
import { GithubService } from "../services/github.service.ts";
import type { HttpResponse } from "../models/http.model.ts";
import { useAsync } from "@oricardopestana/ts-utils";

export async function handleUserStats() {
  const [[userData, userDataError], [userRepos, userReposError]] = await Promise.all([
    useAsync<HttpResponse<GithubUser>, FetchError>(() => GithubService.fetchUserData()),
    useAsync<HttpResponse<{ data: GithubUserRepo[] }>, FetchError>(() => GithubService.fetchUserRepos()),
  ]);
  if (userDataError || userReposError)
    throw new HTTPError(userDataError?.statusMessage ?? userReposError?.statusMessage ?? "Error", {
      status: userDataError?.statusCode ?? userReposError?.statusCode,
    });
  const repoList: Pick<
    GithubUserRepo,
    "id" | "name" | "full_name" | "private" | "fork" | "created_at" | "updated_at" | "pushed_at" | "archived"
  >[] = [];

  if (userRepos.ok && userRepos.data) {
    userRepos.data.forEach((repo: GithubUserRepo) => {
      repoList.push({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        private: repo.private,
        fork: repo.fork,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        archived: repo.archived,
      });
    });
  }
  const languages = (
    await Promise.all(
      repoList
        .filter((repo) => !repo.archived)
        .map((repo) =>
          useAsync<HttpResponse<Record<string, number>>, FetchError>(() =>
            GithubService.fetchRepoLanguages(repo.full_name),
          ),
        ),
    )
  )
    .map(([response]) => (response?.ok ? response.data : null))
    .filter((lang): lang is Record<string, number> => !!lang && Object.keys(lang).length > 0)
    .reduce(
      (acc, lang) => {
        for (const [key, value] of Object.entries(lang)) {
          acc[key] = (acc[key] ?? 0) + value;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  return { userData, userRepos, repoList, languages };
}
