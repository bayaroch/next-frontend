import AuthLayout from '@/components/layouts/LoginLayout';

export default function MainRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
