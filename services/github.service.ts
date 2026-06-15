import type { GithubUser } from "../models/github.model.ts";
import type { HttpResponse } from "../models/http.model.ts";

async function fetchUserData(): Promise<HttpResponse<Nullable<GithubUser>>> {
  const [_headers, headersError] = getGithubHeaders();
  if (headersError) return { ok: false, error: headersError };

  const url = new URL(`https://api.github.com/user`);
  const response = (await fetch(url.toString(), {
    headers: _headers as HeadersInit,
  })) as unknown as Response;
  if (response.ok) {
    const data = await response.json();
    return { ok: true, data };
  }
  return { ok: false, error: { statusCode: response.status, statusMessage: response.statusText } };
}

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
  fetchUserData,
};
