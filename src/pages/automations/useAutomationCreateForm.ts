import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  fb_page_post_id: null,
}

const useAutomationCreateForm = () => {
  const { t } = useTranslation()
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .required(
            t('ERROR.E000001', {
              field: t('AUTOMATION.name'),
            })
          )
          .min(
            2,
            t('ERROR.E000047', {
              field: t('AUTOMATION.name'),
              number: 2,
            })
          )
          .max(
            100,
            t('ERROR.E000046', {
              field: t('AUTOMATION.name'),
              number: 100,
            })
          ),
        fb_page_post_id: Yup.object()
          .required(
            t('ERROR.E000001', {
              field: t('AUTOMATION.post'),
            })
          )
          .nullable(),
      }),
    []
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  })

  return { Controller, methods }
}

export default useAutomationCreateForm
