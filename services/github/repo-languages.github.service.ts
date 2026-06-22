import type { HttpResponse } from "../../models/http.model.ts";
import { GithubService } from "../github.service.ts";

export async function fetchRepoLanguages(repoFullName: string): Promise<HttpResponse<unknown>> {
  const [_headers, headersError] = GithubService.getGithubHeaders();
  if (headersError) return { ok: false, error: headersError };

  const url = new URL(`https://api.github.com/repos/${repoFullName}/languages`);
  const response = (await fetch(url.toString(), {
    headers: _headers as HeadersInit,
  })) as unknown as Response;
  if (response.ok) {
    const data = await response.json();
    return { ok: true, data };
  }
  return { ok: false, error: { statusCode: response.status, statusMessage: response.statusText } };
}
