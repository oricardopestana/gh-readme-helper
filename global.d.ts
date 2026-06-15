declare global {
  type Nullable<T> = T | null;
  type FetchError = { statusCode: number; statusMessage: string };
}

export {};
