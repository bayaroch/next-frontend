import { Container } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Metadata } from 'next';
import * as React from 'react';

import { SITE_CONFIG } from '@/constants';
import { GLOBAL_STYLES } from '@/styles';

import { Providers } from './providers';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_CONFIG.url),
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.title,
    images: [`${SITE_CONFIG.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/images/og.jpg`],
  },
  authors: [
    {
      name: 'Alex',
      url: 'https://hihb.com',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <GlobalStyles styles={GLOBAL_STYLES} />
      <body>
        <Providers>
          <Container sx={{ pl: 0, pr: 0 }}>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}

// Given your setup and requirements, here's a best practice approach to handle authentication, store the access token, and manage the logged-in state:

// 1. Access Token Storage:
//    - Best practice: Store the access token in an HTTP-only cookie for better security.
//    - Alternative: If HTTP-only cookies are not feasible, use localStorage as a fallback.

// 2. Logged-in State:
//    - Store this in your client context for easy access across the app.

// 3. useAuth Hook:
//    - Create a custom hook that uses the client context and provides authentication-related functionalities.

// Here's how to implement this:

// 1. Update your ClientContext to include auth-related state:

// ```typescript
// // types/auth.ts
// export interface AuthState {
//   isLoggedIn: boolean;
//   user: any | null; // Replace 'any' with your user type
// }

// // contexts/AuthContext.ts
// import { AuthState } from '@/types/auth';

// export const AUTH_CTX_DEFAULT_VALUE: AuthState = {
//   isLoggedIn: false,
//   user: null,
// };
// ```

// 2. Create an auth service to handle token storage and API calls:

// ```typescript
// // services/authService.ts
// import Cookies from 'js-cookie';

// const AUTH_TOKEN_KEY = 'authToken';

// export const authService = {
//   setToken: (token: string) => {
//     Cookies.set(AUTH_TOKEN_KEY, token, { secure: true, sameSite: 'strict' });
//   },
//   getToken: () => {
//     return Cookies.get(AUTH_TOKEN_KEY);
//   },
//   removeToken: () => {
//     Cookies.remove(AUTH_TOKEN_KEY);
//   },
//   // Add other auth-related methods (e.g., login, logout API calls)
// };
// ```

// 3. Create a useAuth hook:

// ```typescript
// // hooks/useAuth.ts
// import { useClientContext } from '@/contexts/ClientContext';
// import { AuthState } from '@/types/auth';
// import { authService } from '@/services/authService';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// export const useAuth = () => {
//   const { isLoggedIn, user, updateClientCtx } = useClientContext<AuthState>();
//   const queryClient = useQueryClient();

//   const login = useMutation(
//     async (credentials: { username: string; password: string }) => {
//       // Call your login API here
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         body: JSON.stringify(credentials),
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message);
//       return data;
//     },
//     {
//       onSuccess: (data) => {
//         authService.setToken(data.token);
//         updateClientCtx({ isLoggedIn: true, user: data.user });
//         queryClient.invalidateQueries(); // Invalidate queries to refetch data with new auth state
//       },
//     }
//   );

//   const logout = useMutation(
//     async () => {
//       // Call your logout API here if needed
//       await fetch('/api/logout', { method: 'POST' });
//     },
//     {
//       onSuccess: () => {
//         authService.removeToken();
//         updateClientCtx({ isLoggedIn: false, user: null });
//         queryClient.clear(); // Clear all queries when logging out
//       },
//     }
//   );

//   return {
//     isLoggedIn,
//     user,
//     login: login.mutate,
//     logout: logout.mutate,
//     isLoading: login.isLoading || logout.isLoading,
//   };
// };
// ```

// 4. Update your `_app.tsx` or root layout to use the ClientProvider:

// ```typescript
// // app/layout.tsx
// 'use client';

// import { ClientProvider } from '@/contexts/ClientContext';
// import { AUTH_CTX_DEFAULT_VALUE } from '@/contexts/AuthContext';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ClientProvider defaultValue={AUTH_CTX_DEFAULT_VALUE}>
//         <html lang="en">
//           <body>{children}</body>
//         </html>
//       </ClientProvider>
//     </QueryClientProvider>
//   );
// }
// ```

// 5. Use the useAuth hook in your components:

// ```typescript
// // components/LoginForm.tsx
// 'use client';

// import { useAuth } from '@/hooks/useAuth';

// export default function LoginForm() {
//   const { login, isLoading } = useAuth();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Get form data and call login
//     login({ username: 'user', password: 'pass' });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Login form fields */}
//       <button type="submit" disabled={isLoading}>Login</button>
//     </form>
//   );
// }

// // components/Header.tsx
// 'use client';

// import { useAuth } from '@/hooks/useAuth';

// export default function Header() {
//   const { isLoggedIn, user, logout } = useAuth();

//   return (
//     <header>
//       {isLoggedIn ? (
//         <>
//           <span>Welcome, {user.name}</span>
//           <button onClick={() => logout()}>Logout</button>
//         </>
//       ) : (
//         <Link href="/login">Login</Link>
//       )}
//     </header>
//   );
// }
// ```

// 6. Implement middleware for route protection:

// ```typescript
// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const authToken = request.cookies.get('authToken')?.value;
//   const isLoggedIn = !!authToken;

//   const isPublicRoute = request.nextUrl.pathname === '/home'
//                      || request.nextUrl.pathname.startsWith('/about')
//                      || request.nextUrl.pathname.startsWith('/contact');
//   const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
//                    || request.nextUrl.pathname.startsWith('/register');

//   const isMainGroupRoute = request.nextUrl.pathname === '/' ||
//                            request.nextUrl.pathname.startsWith('/dashboard') ||
//                            request.nextUrl.pathname.startsWith('/profile') ||
//                            request.nextUrl.pathname.startsWith('/settings');

//   if (isLoggedIn) {
//     if (isPublicRoute || isAuthRoute) {
//       return NextResponse.redirect(new URL('/', request.url));
//     }
//   } else {
//     if (isMainGroupRoute) {
//       return NextResponse.redirect(new URL('/home', request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
// ```

// This setup provides:
// - Secure storage of the access token in an HTTP-only cookie.
// - Global auth state management using the ClientContext.
// - A reusable useAuth hook for auth-related operations.
// - Integration with React Query for data fetching and cache management.
// - Middleware for route protection.

// Remember to adjust the API endpoints and data structures according to your specific backend implementation. Also, ensure that your backend sets the HTTP-only cookie for the access token when sending the login response.
