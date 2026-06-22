import { fetchRepoLanguages } from "./github/repo-languages.github.service.ts";
import { fetchUserData } from "./github/user-data.github.service.ts";
import { fetchUserRepos } from "./github/user-repos.github.service.ts";

function getGithubHeaders(): [Nullable<Record<string, string>>, Nullable<FetchError>] {
  const ghApiKey = process.env.GH_API_KEY;
  if (!ghApiKey) {
    return [null, { statusCode: 500, statusMessage: "GH_API_KEY not set" }];
  }
  return [
    {
      Authorization: `Bearer ${ghApiKey}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2026-03-10",
    },
    null,
  ];
}

export const GithubService = {
  getGithubHeaders,
  fetchUserData,
  fetchUserRepos,
  fetchRepoLanguages,
};
