'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryOptions,
} from '@tanstack/react-query';
import * as React from 'react';

import { ThemeProvider } from '@/components/providers/theme-provider';
import Toast from '@/components/Toast';
import api from '@/lib/api';

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  const { data } = await api.get(`${queryKey?.[0]}`);
  return data;
};

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: defaultQueryFn,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryClientProvider client={queryClient}>
        <Toast />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
