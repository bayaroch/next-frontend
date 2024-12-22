import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'

export const initialValues = {
  keyword: '',
}

const useFilterForm = () => {
  const { t } = useTranslation()
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        keyword: Yup.string().max(
          50,
          t('ERROR.E000046', {
            field: t('SYSCOMMON.search_keyword'),
            character: 50,
          })
        ),
      }),
    []
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  })

  return { Controller, methods, initialValues }
}

export default useFilterForm
