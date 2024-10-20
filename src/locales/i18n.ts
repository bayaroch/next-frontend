import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEN from './en/common'
import commonMN from './mn/common'

export const resources = {
  en: {
    translation: { ...commonEN },
  },
  mn: {
    translation: { ...commonMN },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
