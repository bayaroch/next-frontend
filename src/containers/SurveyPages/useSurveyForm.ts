import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'

const initialValues = {
  company_type: '',
  role: '',
  agency_size: '',
}

const useSurveyForm = () => {
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        company_type: Yup.string().required(),
        role: Yup.string().required(),
        agency_size: Yup.string().required(),
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

export default useSurveyForm
