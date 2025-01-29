import { yupResolver } from '@hookform/resolvers/yup'
import { PostType } from '@services/automation.services'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  fb_page_post_id: null,
  is_global: false,
  post_type: PostType.POSTS,
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

        is_global: Yup.boolean().required(
          t('ERROR.E000001', {
            field: t('AUTOMATION.is_global'),
          })
        ),

        fb_page_post_id: Yup.object().when('is_global', {
          is: false,
          then: (schema) =>
            schema.required(
              t('ERROR.E000001', {
                field: t('AUTOMATION.select_post'),
              })
            ),
          otherwise: (schema) => schema.nullable(),
        }),
        post_type: Yup.string().required(
          t('ERROR.E000001', {
            field: t('AUTOMATION.post_type'),
          })
        ),
      }),
    []
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema) as any,
    defaultValues: initialValues,
    mode: 'onChange',
  })

  return { Controller, methods }
}

export default useAutomationCreateForm
