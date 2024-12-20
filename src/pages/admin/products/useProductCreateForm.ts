import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  price: 0,
  token_amount: 0,
  duration_days: 0,
  description: '',
}

const useProductCreateForm = () => {
  const { t } = useTranslation()
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .required(
            t('ERROR.E000001', {
              field: t('PRODUCT.name'),
            })
          )
          .min(
            2,
            t('ERROR.E000047', {
              field: t('PRODUCT.name'),
              number: 2,
            })
          )
          .max(
            100,
            t('ERROR.E000046', {
              field: t('PRODUCT.name'),
              number: 100,
            })
          ),
        price: Yup.number()
          .required(
            t('ERROR.E000001', {
              field: t('PRODUCT.price'),
            })
          )
          .min(
            0,
            t('ERROR.E000047', {
              field: t('PRODUCT.price'),
              number: 0,
            })
          ),
        token_amount: Yup.number()
          .required(
            t('ERROR.E000001', {
              field: t('PRODUCT.token_amount'),
            })
          )
          .min(
            0,
            t('ERROR.E000047', {
              field: t('PRODUCT.token_amount'),
              number: 0,
            })
          ),
        duration_days: Yup.number()
          .required(
            t('ERROR.E000001', {
              field: t('PRODUCT.duration_days'),
            })
          )
          .min(
            1,
            t('ERROR.E000047', {
              field: t('PRODUCT.duration_days'),
              number: 1,
            })
          ),
        description: Yup.string().max(
          500,
          t('ERROR.E000046', {
            field: t('PRODUCT.description'),
            number: 500,
          })
        ),
      }),
    [t]
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  })

  return { Controller, methods }
}

export default useProductCreateForm
