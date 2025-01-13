import { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'

export enum PAYMENT_METHOD {
  QPAY = 'Qpay',
  BANK = 'Bank',
  FREE = 'Free',
}

export const initialValues = {
  product_id: null,
  payment_method: PAYMENT_METHOD.QPAY,
  quantity: 1,
  promo_code: '',
}

const usePurchaseForm = () => {
  const { t } = useTranslation()
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        product_id: Yup.object().required(t('ERROR.required_field')).nullable(),
        payment_method: Yup.string().required(t('ERROR.required_field')),
        quantity: Yup.number()
          .min(1, t('ERROR.minimum_quantity', { min: 1 }))
          .max(100, t('ERROR.maximum_quantity', { max: 100 }))
          .required(t('ERROR.required_field')),
        promo_code: Yup.string(),
      }),
    [t]
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  })

  return { Controller, methods, initialValues }
}

export default usePurchaseForm
