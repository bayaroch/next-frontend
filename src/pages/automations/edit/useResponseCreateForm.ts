import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { t } from 'i18next'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { CommentResponse } from '@services/automation.services'

const initialValues = {
  keyword: '',
  content: '',
}

const useResponseCreateForm = (existingResponses: CommentResponse[]) => {
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        keyword: Yup.string()
          .required(t('ERROR.E000001', { field: t('AUTOMATION.keyword') }))
          .min(
            2,
            t('ERROR.E000047', {
              field: t('AUTOMATION.keyword'),
              number: 2,
            })
          )
          .max(
            20,
            t('ERROR.E000046', {
              field: t('AUTOMATION.keyword'),
              number: 20,
            })
          )
          .test(
            'unique-keyword',
            t('ERROR.E000069', { field: t('AUTOMATION.keyword') }),
            function (value) {
              return !existingResponses.some(
                (response) => response.keyword === value
              )
            }
          ),
        content: Yup.string()
          .required(t('ERROR.E000001', { field: t('AUTOMATION.content') }))
          .min(
            2,
            t('ERROR.E000047', {
              field: t('AUTOMATION.content'),
              number: 2,
            })
          )
          .max(
            500,
            t('ERROR.E000046', {
              field: t('AUTOMATION.content'),
              number: 500,
            })
          ),
      }),
    [existingResponses]
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  })

  return { Controller, methods }
}

export default useResponseCreateForm
