/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import InfoMobile from './InfoMobile'
import Info from './Info'
import Pricing from '@components/@public/Pricing'
import {
  Product,
  ProductionListResponse,
  ProductService,
} from '@services/payment.services'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@global/AuthContext'
import LanguageSwitcher from '@layouts/Shared/Header/LanguageSwitcher'
import { Languages } from '@constants/common.constants'
import useProductForm from './usePurchaseForm'
import { useWatch } from 'react-hook-form'
import FormField from '@components/@material-extend/FormField'
import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material'
import _ from 'lodash'

const steps = ['Select Plan', 'Place Order', 'Payment page']

export default function Checkout() {
  const { t } = useTranslation()
  const { logout, changeLanguage, lang, init } = useAuth()
  const [activeStep, setActiveStep] = React.useState(0)
  const { data: tiers } = useQuery<ProductionListResponse, Error>(
    ['products'],
    () => ProductService.getProductsByPage(),
    {
      refetchOnWindowFocus: false,
    }
  )
  const { Controller, methods } = useProductForm()

  const {
    control,
    reset,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
  } = methods

  const selectedProduct = useWatch({
    control,
    name: 'product_id',
  })
  const formData = useWatch({ control })

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Pricing
              data={tiers}
              selected={selectedProduct}
              onChoose={(item: Product) => setValue('product_id', item)}
            />
          </>
        )
      case 1:
        return (
          <Box sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
            <Stack spacing={3}>
              <Controller
                name="product_id"
                control={control}
                render={({ field }) => (
                  <FormField fullWidth label={t('PRODUCT.name')}>
                    <OutlinedInput
                      {...field}
                      fullWidth
                      disabled
                      value={_.get(selectedProduct, 'name', '')}
                    />
                  </FormField>
                )}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <FormField
                    fullWidth
                    errors={errors?.quantity?.message}
                    label={t('PRODUCT.quantity')}
                    required
                  >
                    <OutlinedInput
                      {...field}
                      fullWidth
                      type="number"
                      placeholder={t('PRODUCT.quantity')}
                    />
                  </FormField>
                )}
              />
              <Controller
                name="payment_method"
                control={control}
                render={({ field }) => (
                  <FormField
                    fullWidth
                    errors={errors?.payment_method?.message}
                    label={t('PRODUCT.payment_method')}
                    required
                  >
                    <FormControl fullWidth>
                      <Select {...field}>
                        <MenuItem value="Qpay">{t('PAYMENT.qpay')}</MenuItem>
                      </Select>
                    </FormControl>
                  </FormField>
                )}
              />
              <FormField
                label={t('PRODUCT.promo_code')}
                fullWidth
                errors={errors.promo_code?.message}
              >
                <Controller
                  name="promo_code"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      fullWidth
                      placeholder={t('PRODUCT.promo_code')}
                    />
                  )}
                />
              </FormField>
            </Stack>
          </Box>
        )
      case 2:
        return <></>
      default:
        throw new Error('Unknown step')
    }
  }

  const handleFormSubmit = (data: any) => null

  return (
    <Grid
      container
      sx={{
        height: {
          xs: '100%',
          sm: 'calc(100dvh - var(--template-frame-height, 0px))',
        },
        mt: {
          xs: 4,
          sm: 0,
        },
      }}
    >
      <Grid
        size={{ xs: 12, sm: 4, lg: 3 }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          borderRight: { sm: 'none', md: '1px solid' },
          borderColor: { sm: 'none', md: 'divider' },
          alignItems: 'start',
          position: 'relative',
          pt: 16,
          px: 10,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
            maxWidth: 500,
          }}
        >
          <Info init={init} formData={formData} />
        </Box>
        <Button
          variant="text"
          onClick={() => logout()}
          sx={{ position: 'absolute', bottom: 0, mb: 4 }}
        >
          {t('SYSCOMMON.logout')}
        </Button>
      </Grid>
      <Grid
        size={{ sm: 12, md: 8, lg: 9 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'start',
          pt: { xs: 0, sm: 16 },
          px: { xs: 2, sm: 10 },
          gap: { xs: 4, md: 8 },
        }}
      >
        <form
          id="create-transaction"
          style={{ width: '100%' }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Stack
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              mt: { xs: 1, md: 4 },
              px: 4,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              mr: 4,
            }}
          >
            <Box>
              <Button
                variant="text"
                sx={{ display: { xs: 'auto', md: 'none' } }}
                onClick={() => logout()}
              >
                {t('SYSCOMMON.logout')}
              </Button>
            </Box>
            <Box>
              <LanguageSwitcher
                currentLang={lang}
                data={Languages}
                onSwitch={changeLanguage}
              />
            </Box>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 1000 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
                width: '100%',
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? '$144.97' : '$134.98'}
                </Typography>
              </div>
              <InfoMobile formData={formData} init={init} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 1000 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      '.MuiStepLabel-labelContainer': { maxWidth: '70px' },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Your order number is
                  <strong>&nbsp;#140396</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    disabled={activeStep === 0 && selectedProduct === null}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}
