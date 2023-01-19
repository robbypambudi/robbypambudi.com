import { AxiosError } from 'axios';

import { ApiError } from '@/types/api';

export const DEFAULT_TOAST_MESSAGE = {
  loading: 'Loading...',
  success: 'Berhasil',
  error: (err: AxiosError<ApiError>) => {
    return (
      err?.response?.data?.message ||
      'Terjadi kesalahan, mohon coba beberapa saat lagi'
    );
  },
};
