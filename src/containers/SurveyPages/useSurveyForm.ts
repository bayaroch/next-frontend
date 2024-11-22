import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'

const initialValues = {
  company_type: null,
  role: null,
  agency_size: null,
}

const useSurveyForm = () => {
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        company_type: Yup.string().required().nullable(),
        role: Yup.string().required().nullable(),
        agency_size: Yup.string().required().nullable(),
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
