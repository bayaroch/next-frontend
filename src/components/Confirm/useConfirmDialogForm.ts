import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { t } from 'i18next'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'

const initialValues = {
  confirm: '',
  reason: '',
}

const useConfirmDialogForm = () => {
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        confirm: Yup.string(),
        reason: Yup.string()
          .required(
            t('ERROR.E000001', {
              field: t('SYSCOMMON.reason'),
            })
          )
          .max(
            100,
            t('ERROR.E000046', {
              field: t('SYSCOMMON.reason'),
              number: 100,
            })
          ),
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

export default useConfirmDialogForm
