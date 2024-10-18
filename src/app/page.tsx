import MainLayout from '@/components/layouts/MainLayout';

export default function RootPage() {
  // In a real app, you'd check for a valid token in cookies or local storage

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
