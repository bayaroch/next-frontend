import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { initReactI18next } from 'react-i18next'
import moment from 'moment'
import 'moment/locale/ja'
import 'moment/locale/mn'
import ReactGA4 from 'react-ga4'
import customHistory from 'customHistory'
import { CustomRouter } from 'customRouter'
import AuthLayout from 'layouts/AuthLayout'
import BlankLayout from 'layouts/BlankLayout'
import MainLayout from 'layouts/MainLayout'
const NotFound = lazy(() => import('@pages/404'))
const NotAvailable = lazy(() => import('@pages/503'))
const LoginPage = lazy(() => import('@pages/login'))
const LogOut = lazy(() => import('@pages/logout'))
import '@theme/global.css'
const Home = lazy(() => import('@pages/home'))
import InitAppLoader from '@components/InitApp/InitAppLoader'
const ContactPage = lazy(() => import('@pages/contact'))
const TermsOfConditionPage = lazy(() => import('@pages/terms_of_condition'))
const DashboardPage = lazy(() => import('@pages/dashboard'))
import PageLoader from '@components/InitApp/PageLoader'
import { useAuth } from 'global/AuthContext'
import PublicLayout from '@layouts/PublicLayout'
import { useQuery } from 'react-query'
import {
  AppInitResponse,
  initializeAppService,
  ROLE,
} from '@services/auth.services'
import SetupPage from '@pages/setup'
import _ from 'lodash'
import ProtectedOutlet from '@containers/ProtectedOutlet'
import PartnerPage from '@pages/partner'
import PendingPage from '@pages/pending'
import Checkout from '@containers/Checkout'
import ProfilePage from '@pages/profile'
import ProfileSubPage from '@pages/profile/ProfileSubPage'
import AccountTransactions from '@pages/profile/AccountTransactions'
// turn those dynamic import import ProductsPage from '@pages/admin/products'
const ProductsPage = lazy(() => import('@pages/admin/products'))
const SellersPage = lazy(() => import('@pages/admin/sellers'))
const InternalLoginPage = lazy(() => import('@pages/internal/login'))
const AutomationListPage = lazy(() => import('@pages/automations'))
const PrivacyPolicyPage = lazy(() => import('@pages/privacy_policy'))
const AboutPage = lazy(() => import('@pages/about'))
const Connect = lazy(() => import('@pages/connect'))
const AutomationEditPage = lazy(() => import('@pages/automations/edit'))
// Initialize React Ga with your tracking ID

// eslint-disable-next-line no-console

moment.locale('mn')

function App() {
  const { i18n } = useTranslation()
  const { lang, isLoggedIn, logout, setInit, init } = useAuth()

  const { isLoading: isInitializing } = useQuery({
    queryKey: ['appInit'],
    queryFn: initializeAppService,
    enabled: isLoggedIn, // Only run when user is logged in
    staleTime: Infinity, // Consider the data fresh forever since it's initialization data
    onSuccess: (data) => {
      setInit(data)
    },
    onError: () => {
      setInit(undefined)
      logout()
    },
  })

  useEffect(() => {
    // eslint-disable-next-line no-console
    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        lng: lang || 'mn',
      })

    // trackingID &&
    //   ReactGA4.initialize(trackingID, {
    //     gaOptions: {
    //       cookieDomain: '.kommai.mn', // Ensure cookies are accessible across subdomains
    //       cookieFlags: 'SameSite=None; Secure', // Set SameSite and Secure attributes
    //     },
    //   })
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-console
    if (lang) {
      i18n.changeLanguage(lang)
      moment.locale(lang)
    }
  }, [lang])

  if (isLoggedIn && isInitializing) {
    return <InitAppLoader />
  }

  return (
    <CustomRouter history={customHistory}>
      <Routes>
        <Route path={'/'} element={<PublicOutlet />}>
          <Route element={<AuthLayout />}>
            <Route
              path="login"
              element={
                <Suspense fallback={<InitAppLoader />}>
                  <LoginPage />
                </Suspense>
              }
            />
            <Route path="internal">
              <Route
                path="login"
                element={
                  <Suspense fallback={<InitAppLoader />}>
                    <InternalLoginPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          <Route
            path={'logout'}
            element={
              <Suspense fallback={<InitAppLoader />}>
                <LogOut />
              </Suspense>
            }
          />
        </Route>
        {/* MAIN PUBLIC STACK START */}
        <Route path={'/'} element={<PublicOutlet />}>
          <Route element={<PublicLayout />} path={'/'}>
            <Route
              path={'home'}
              element={
                <BlankLayout>
                  <Suspense fallback={<InitAppLoader />}>
                    <Home />
                  </Suspense>
                </BlankLayout>
              }
            />
            <Route
              path={'about'}
              element={
                <BlankLayout>
                  <Suspense fallback={<InitAppLoader />}>
                    <AboutPage />
                  </Suspense>
                </BlankLayout>
              }
            />
            <Route
              path={'contact'}
              element={
                <BlankLayout>
                  <Suspense fallback={<InitAppLoader />}>
                    <ContactPage />
                  </Suspense>
                </BlankLayout>
              }
            />
            <Route
              path={'terms'}
              element={
                <BlankLayout>
                  <Suspense fallback={<InitAppLoader />}>
                    <TermsOfConditionPage />
                  </Suspense>
                </BlankLayout>
              }
            />

            <Route
              path={'privacy'}
              element={
                <BlankLayout>
                  <Suspense fallback={<InitAppLoader />}>
                    <PrivacyPolicyPage />
                  </Suspense>
                </BlankLayout>
              }
            />
          </Route>
        </Route>
        {/* MAIN PUBLIC STACK END */}
        {/* MAIN PRIVATE STACK START*/}
        <Route element={<PrivateOutlet />} path={'/'}>
          {/* Users */}
          <Route
            element={<ProtectedOutlet allowedRole={ROLE.USER} />}
            path={'/'}
          >
            <Route
              element={
                <PaymentOutlet initData={init} isLoading={isInitializing} />
              }
              path={'/'}
            >
              <Route element={<MainLayout />} path={'/'}>
                <Route
                  index
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <DashboardPage />
                    </Suspense>
                  }
                />

                <Route path="automation">
                  <Route
                    index
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <AutomationListPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <AutomationEditPage />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path="connect"
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Connect />
                    </Suspense>
                  }
                />

                <Route path="profile">
                  <Route
                    index
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <ProfilePage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="subscriptions"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <ProfileSubPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path="transactions"
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <AccountTransactions />
                      </Suspense>
                    }
                  />
                </Route>

                {/* Project Route Pack Start */}
              </Route>
            </Route>
          </Route>
          {/* Users */}
          {/* Admin */}
          <Route
            path="admin"
            element={<ProtectedOutlet allowedRole={ROLE.ADMIN} />}
          >
            <Route element={<MainLayout />}>
              <Route
                index
                element={
                  <Suspense fallback={<PageLoader />}>
                    Welcome to admin dashboard
                  </Suspense>
                }
              />
              <Route path="products">
                <Route
                  index
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <ProductsPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route path="sellers">
                <Route
                  index
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <SellersPage />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Route>
          {/* Admin */}
          {/* Partners */}
          <Route
            path="partner"
            element={<ProtectedOutlet allowedRole={ROLE.SELLER} />}
          >
            <Route element={<MainLayout />} path={'partner'}>
              <Route
                index
                element={
                  <Suspense fallback={<PageLoader />}>
                    <PartnerPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>
          {/* Partners */}

          <Route
            path="waiting_approval"
            element={<ProtectedOutlet allowedRole={ROLE.SELLER} />}
          >
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <PendingPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
        {/* MAIN PRIVATE STACK END*/}
        {/* No Route match redirects to last route */}
        <Route
          path="/503"
          element={
            <BlankLayout>
              <Suspense fallback={<PageLoader />}>
                <NotAvailable />
              </Suspense>
            </BlankLayout>
          }
        />
        <Route
          path="*"
          element={
            <BlankLayout>
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            </BlankLayout>
          }
        />
      </Routes>
    </CustomRouter>
  )
}

const PrivateOutlet = () => {
  const { isLoggedIn, init } = useAuth()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    ReactGA4.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    })
  }, [location])

  if (!isLoggedIn) {
    return <Navigate to={'/home'} />
  }

  const role = _.get(init, 'user_info.role', undefined)
  const isConfirmedSeller = _.get(init, 'user_info.is_confirmed_seller', false)

  // Redirect based on role and current path
  if (role === ROLE.ADMIN) {
    if (!location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin" replace />
    }
  } else if (role === ROLE.SELLER) {
    if (isConfirmedSeller) {
      if (!location.pathname.startsWith('/partner')) {
        return <Navigate to="/partner" replace />
      }
    } else {
      return <Navigate to="/waiting_approval" replace />
    }
  } else if (role === ROLE.USER) {
    if (
      location.pathname.startsWith('/admin') ||
      location.pathname.startsWith('/partner')
    ) {
      return <Navigate to="/" replace />
    }
  } else {
    // If role is undefined or not recognized
    return <Navigate to="/" replace />
  }

  // If none of the above conditions are met, render the outlet
  return <Outlet />
}
const PaymentOutlet = ({
  initData,
  isLoading,
}: {
  initData?: AppInitResponse
  isLoading: boolean
}) => {
  if (isLoading) {
    return <InitAppLoader />
  }

  if (
    initData &&
    initData.subscription?.status !== 'active' &&
    !_.isEmpty(initData.connected_pages) &&
    !_.isEmpty(initData.user_info.survey_responses)
  ) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Checkout />
      </Suspense>
    )
  }

  if (
    (initData && _.isEmpty(initData.connected_pages)) ||
    (initData && _.isEmpty(initData.user_info.survey_responses))
  ) {
    return (
      <Suspense fallback={<PageLoader />}>
        <SetupPage />
      </Suspense>
    )
  }
  return <Outlet />
}

const PublicOutlet = () => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // ReactGA4.send({
    //   hitType: 'pageview',
    //   page: location.pathname + location.search,
    // })
  }, [location])

  const authPagePaths = ['/login', '/internal/login']

  const isAuthPage = authPagePaths.includes(location.pathname)

  if (isLoggedIn && isAuthPage) {
    return <Navigate to={'/'} />
  }
  return <Outlet />
}

export default App
