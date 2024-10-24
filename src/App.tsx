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

// Initialize React Ga with your tracking ID

// eslint-disable-next-line no-console

moment.locale('mn')

function App() {
  const { i18n } = useTranslation()
  const { lang } = useAuth()

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
          </Route>
        </Route>

        {/* MAIN PUBLIC STACK END */}
        {/* MAIN PRIVATE STACK START*/}
        <Route element={<PrivateOutlet />} path={'/'}>
          <Route element={<MainLayout />} path={'/'}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            {/* Project Route Pack Start */}
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
  const { isLoggedIn } = useAuth()
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

  return isLoggedIn ? <Outlet /> : <Navigate to={'/home'} />
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

  const authPagePaths = ['/login']

  const isAuthPage = authPagePaths.includes(location.pathname)

  if (isLoggedIn && isAuthPage) {
    return <Navigate to={'/'} />
  }
  return <Outlet />
}

export default App
