export interface QueryResponse<T> {
  errors: string;
  message: string;
  response: T;
  success: boolean;
}

export interface ReactQueryResponse<T> {
  data: QueryResponse<T>;
}