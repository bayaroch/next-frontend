import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const useProfileForm = () => {
  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(
      t('ERROR.E000001', { field: t('PROFILE.first_name') })
    ),
    last_name: Yup.string().required(
      t('ERROR.E000001', { field: t('PROFILE.last_name') })
    ),
    phone_number: Yup.string().nullable(),
    email: Yup.string()
      .email(t('ERROR.E000002'))
      .required(t('ERROR.E000001', { field: t('PROFILE.email') })),
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
    },
    mode: 'onChange',
  })

  return methods
}

export default useProfileForm
