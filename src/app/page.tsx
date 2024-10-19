'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useClientContext } from '@/hooks/useClientContext';

import MainLayout from '@/components/layouts/MainLayout';

export default function RootPage() {
  const { isLoggedIn } = useClientContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/home');
    }
  }, [isLoggedIn, router]);

  // In a real app, you'd check for a valid token in cookies or local storage

  // If not logged in, return null to avoid rendering anything while redirecting
  if (!isLoggedIn) {
    return null;
  }

  // If logged in, allow access to the root (which will render the dashboard)
  return (
    <MainLayout>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard. You're logged in!</p>
      </div>
    </MainLayout>
  );
}
