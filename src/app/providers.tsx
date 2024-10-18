'use client';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ClientProvider } from '@/hooks/useClientContext';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientProvider>{children} </ClientProvider>
    </QueryClientProvider>
  );
}
