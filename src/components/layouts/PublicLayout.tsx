import { Box } from '@mui/material';

import Footer from '@/components/layouts/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box>Public header</Box>
      {children}
      <Footer />
    </>
  );
}
