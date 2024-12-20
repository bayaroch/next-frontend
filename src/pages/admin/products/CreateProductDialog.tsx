import React from 'react'
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
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import FormField from '@components/@material-extend/FormField'
import { CreateProductParams } from '@services/payment.services'
import useProductCreateForm from './useProductCreateForm'
import CurrencyInput from 'react-currency-input-field'

interface CreateProductDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateProductParams) => void
}

const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  height: 'calc(100vh - 120px)',
  overflow: 'hidden',
})

const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation()
  const { Controller, methods } = useProductCreateForm()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = methods
  const handleFormSubmit = (data: any) => {
    onSubmit(data)
    onClose()
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
          {t('PRODUCT.create_product')}
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
                    prefix="T"
                    ref={ref}
                    style={{
                      // Basic styling, adjust as needed
                      width: '100%',
                      padding: '10px',
                      fontSize: '16px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </FormField>
              )}
            />

            <Controller
              name="token_amount"
              control={control}
              rules={{ required: 'Token amount is required', min: 0 }}
              render={({ field }) => (
                <FormField
                  fullWidth
                  errors={errors.token_amount?.message}
                  label={t('PRODUCT.token_amount')}
                  required
                >
                  <OutlinedInput
                    {...field}
                    fullWidth
                    type="number"
                    placeholder={t('PRODUCT.token_amount')}
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
                  <OutlinedInput
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    placeholder={t('PRODUCT.description')}
                  />
                </FormField>
              )}
            />
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
          <Button onClick={onClose}>{t('SYSCOMMON.cancel')}</Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid}
          >
            {t('SYSCOMMON.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateProductDialog
