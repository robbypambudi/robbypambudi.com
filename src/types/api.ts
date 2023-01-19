export type ApiReturn<T> = {
  code: string;
  status: string;
  data: T;
};

export type ApiError = {
  message: string;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<DataType> {
  status: boolean;
  data: DataType;
  meta: {
    last_page: number;
    total: number;
  };
}
