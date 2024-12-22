import React, { useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  styled,
  IconButton,
  Stack,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import FormField from '@components/@material-extend/FormField'
import { CreateProductParams, Product } from '@services/payment.services'
import useProductCreateForm from './useProductCreateForm'
import CurrencyInput from 'react-currency-input-field'
import { Add, DeleteOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'

interface ProductDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateProductParams) => void
  data?: Product | null
  isLoading: boolean
}

const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  overflow: 'hidden',
})

const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onClose,
  onSubmit,
  isLoading,
  data,
}) => {
  const { t } = useTranslation()
  const { Controller, methods, fields, append, remove } = useProductCreateForm()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = methods

  useEffect(() => {
    if (data && open) {
      reset(data)
    }
  }, [data, reset, open])

  // eslint-disable-next-line no-console
  console.log('12312312', errors)

  useEffect(() => {
    if (!open) {
      reset({
        name: '',
        price: 0,
        token_amount: 0,
        duration_days: 0,
        description: '',
        additional_settings: [],
      })
    }
  }, [open, reset])

  // eslint-disable-next-line no-console
  console.log(data, isValid)

  const handleFormSubmit = (formData: any) => {
    onSubmit(formData)
  }

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 0,
        },
      }}
      fullScreen
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <StyledDialogTitle>
          {data ? t('PRODUCT.edit_product') : t('PRODUCT.create_product')}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <FormField
                  fullWidth
                  errors={errors.name?.message}
                  label={t('PRODUCT.name')}
                  required
                >
                  <OutlinedInput
                    {...field}
                    fullWidth
                    placeholder={t('PRODUCT.name')}
                  />
                </FormField>
              )}
            />

            <Controller
              name="price"
              control={control}
              rules={{ required: 'Price is required', min: 0 }}
              render={({ field: { onChange, value, ref } }) => (
                <FormField
                  fullWidth
                  errors={errors.price?.message}
                  label={t('PRODUCT.price')}
                  required
                >
                  <CurrencyInput
                    id="price-input"
                    name="price"
                    placeholder="Please enter a price"
                    defaultValue={value}
                    decimalsLimit={2}
                    onValueChange={(value) => onChange(value)}
                    prefix="₮"
                    groupSeparator=","
                    decimalSeparator="."
                    customInput={OutlinedInput}
                    ref={ref}
                  />
                </FormField>
              )}
            />

            <Controller
              name="token_amount"
              control={control}
              rules={{ required: 'Token amount is required', min: 0 }}
              render={({ field: { onChange, value, ref } }) => (
                <FormField
                  fullWidth
                  errors={errors.token_amount?.message}
                  label={t('PRODUCT.token_amount')}
                  required
                >
                  <CurrencyInput
                    id="token_amount"
                    name="token_amount"
                    placeholder={t('PRODUCT.token_amount')}
                    defaultValue={value}
                    decimalsLimit={2}
                    onValueChange={(value) => onChange(value)}
                    groupSeparator=","
                    decimalSeparator="."
                    customInput={OutlinedInput}
                    ref={ref}
                  />
                </FormField>
              )}
            />

            <Controller
              name="duration_days"
              control={control}
              rules={{ required: 'Duration is required', min: 1 }}
              render={({ field }) => (
                <FormField
                  fullWidth
                  errors={errors.duration_days?.message}
                  label={t('PRODUCT.duration_days')}
                  desc={t('FORM_DESC.duration_days')}
                  required
                >
                  <OutlinedInput
                    {...field}
                    fullWidth
                    type="number"
                    placeholder={t('PRODUCT.duration_days')}
                  />
                </FormField>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <FormField
                  fullWidth
                  errors={errors.description?.message}
                  label={t('PRODUCT.description')}
                >
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    slotProps={{
                      input: {
                        sx: {
                          padding: '8px',
                          height: '100%',
                          overflow: 'auto',
                          maxHeight: '100px',
                        },
                      },
                    }}
                    rows={4}
                    placeholder={t('PRODUCT.description')}
                  />
                </FormField>
              )}
            />

            {/* Additional Settings */}
            <FormField
              fullWidth
              label={t('PRODUCT.additional_settings')}
              desc={t('FORM_DESC.additional_settings')}
              sx={{ mb: 0 }}
            />
            {fields.map((field, index) => (
              <Stack
                key={field.id}
                direction="row"
                spacing={1}
                sx={{ pb: 1, width: '100%', marginTop: '0 !important' }}
              >
                <Controller
                  name={`additional_settings.${index}.key`}
                  control={control}
                  render={({ field }) => (
                    <FormField
                      sx={{ width: 200 }}
                      label=""
                      error={
                        !!errors.additional_settings?.[index]?.key?.message
                      }
                    >
                      <OutlinedInput
                        {...field}
                        placeholder={t('PRODUCT.setting_key')}
                        error={!!errors.additional_settings?.[index]?.key}
                      />
                    </FormField>
                  )}
                />

                <Controller
                  name={`additional_settings.${index}.value`}
                  control={control}
                  render={({ field }) => (
                    <FormField
                      label=""
                      fullWidth
                      error={
                        !!errors.additional_settings?.[index]?.value?.message
                      }
                    >
                      <OutlinedInput
                        {...field}
                        placeholder={t('PRODUCT.setting_value')}
                        sx={{ width: '100%' }}
                      />
                    </FormField>
                  )}
                />

                <IconButton onClick={() => remove(index)}>
                  <DeleteOutlined />
                </IconButton>
              </Stack>
            ))}
            <Button
              color="primary"
              variant="outlined"
              startIcon={<Add />}
              onClick={() => append({ key: '', value: '' })}
            >
              {t('PRODUCT.add_settings')}
            </Button>
          </Stack>
        </StyledDialogContent>
        <DialogActions
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #ccc',
          }}
        >
          <Button variant="outlined" color="primary" onClick={onClose}>
            {t('SYSCOMMON.cancel')}
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid}
            loading={isLoading}
          >
            {data ? t('SYSCOMMON.update') : t('SYSCOMMON.create')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProductDialog
