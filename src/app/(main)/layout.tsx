import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useClientContext } from '@/hooks/useClientContext';

import MainLayout from '@/components/layouts/MainLayout';

export default function MainRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useClientContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  // If not logged in, don't render anything (or you could render a loading spinner)

  return <MainLayout>{children}</MainLayout>;
}
