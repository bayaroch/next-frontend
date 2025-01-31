import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  fb_page_post_id: '',
  is_private_response: false,
  comment_responses: [{ keyword: '', content: '', chat: '' }],
  ignore_global: false,
  is_global: false,
  only_instant: false,
  instant_response: {
    content: '',
    chat: '',
  },
}

const useAutomationEditForm = (defaultValues = initialValues) => {
  const { t } = useTranslation()
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string()
          .required(t('ERROR.E000001', { field: t('AUTOMATION.name') }))
          .min(
            2,
            t('ERROR.E000047', { field: t('AUTOMATION.name'), number: 2 })
          )
          .max(
            100,
            t('ERROR.E000046', { field: t('AUTOMATION.name'), number: 100 })
          ),
        fb_page_post_id: Yup.string().required(
          t('ERROR.E000001', { field: t('AUTOMATION.post') })
        ),
        is_private_response: Yup.boolean(),
        is_global: Yup.boolean().required(
          t('ERROR.E000001', { field: t('AUTOMATION.is_global') })
        ),
        ignore_global: Yup.boolean(),
        comment_responses: Yup.array().of(
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
              ),
            content: Yup.string().max(
              500,
              t('ERROR.E000046', {
                field: t('AUTOMATION.content'),
                number: 500,
              })
            ),
            chat: Yup.string().max(
              500,
              t('ERROR.E000046', {
                field: t('AUTOMATION.chat'),
                number: 500,
              })
            ),
          })
        ),
        instant_response: Yup.object().shape({
          content: Yup.string().max(
            500,
            t('ERROR.E000046', {
              field: t('AUTOMATION.content'),
              number: 500,
            })
          ),
          chat: Yup.string().max(
            500,
            t('ERROR.E000046', {
              field: t('AUTOMATION.chat'),
              number: 500,
            })
          ),
        }),
        only_instant: Yup.boolean(),
      }),
    []
  )

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  })

  const { fields, append, remove, update } = useFieldArray({
    control: methods.control,
    name: 'comment_responses',
  })

  return {
    ...methods,
    fields,
    Controller,
    append,
    reset: methods.reset,
    setValue: methods.setValue,
    remove,
    update,
  }
}

export default useAutomationEditForm
