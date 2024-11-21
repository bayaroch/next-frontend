import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const initialValues = {
  name: '',
  fb_page_post_id: '',
  comment_responses: [{ keyword: '', content: '' }],
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
          })
        ),
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
