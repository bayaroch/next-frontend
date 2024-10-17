export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='login-container'>{children}</div>;
}
