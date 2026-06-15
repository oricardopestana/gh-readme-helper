export type HttpResponse<T> = { ok: true; data: T } | { ok: false; error: FetchError };
