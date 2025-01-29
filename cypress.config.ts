import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    retries: 0,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  env: {
    // googleRefreshToken: process.env.REACT_APP_TEST_ACCOUNT_REFRESH_TOKEN,
    // googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    // googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    // ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    // EMPLOYEE_EMAIL: process.env.EMPLOYEE_EMAIL,
    // TEST_USER_PASSWORD: process.env.TEST_USER_PASSWORD,
    // BASE_URL: process.env.REACT_APP_TEST_BASE_URL,
    // AUTH_BASE_URL: process.env.REACT_APP_TEST_AUTH_BASE_URL,
  },
})
