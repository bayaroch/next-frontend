import MainLayout from '@/components/layouts/MainLayout';

import DashboardPage from '@/app/(main)/page';

export default function RootPage() {
  // In a real app, you'd check for a valid token in cookies or local storage

  // If logged in, allow access to the root (which will render the dashboard)
  return (
    <MainLayout>
      <DashboardPage />
    </MainLayout>
  );
}
