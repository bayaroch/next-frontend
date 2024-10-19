'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Adjust the import path as necessary
import { useClientContext } from '@/hooks/useClientContext';

import AuthLayout from '@/components/layouts/LoginLayout';

export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useClientContext();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  // If logged in, don't render anything while redirecting
  if (isLoggedIn) {
    return null;
  }

  // If not logged in, render the AuthLayout with children
  return <AuthLayout>{children}</AuthLayout>;
}
