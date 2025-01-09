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
  CheckResponse,
  CheckTransactionVariables,
  CreateTransactionParams,
  Product,
  ProductionListResponse,
  ProductService,
  TransactionResponse,
  TransactionService,
  PromoService,
  PromoApplyParams,
  PromoResponse,
  Promo,
} from '@services/payment.services'
import { useMutation, useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@global/AuthContext'
import LanguageSwitcher from '@layouts/Shared/Header/LanguageSwitcher'
import { Languages } from '@constants/common.constants'
import useProductForm from './usePurchaseForm'
import { useWatch } from 'react-hook-form'
import FormField from '@components/@material-extend/FormField'
import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material'
import _ from 'lodash'
import { useToast } from '@components/ToastProvider'
import { LoadingButton } from '@mui/lab'
import SitemarkIcon from '@components/@public/SitemarkIcon'
import NoSubscriptionMessage from '@components/NoSubscription'

export default function Checkout() {
  const { t } = useTranslation()
  const steps = [
    t('PAYMENT.select_plan'),
    t('PAYMENT.place_order'),
    t('PAYMENT.payment_page'),
  ]
  const { logout, changeLanguage, lang, init } = useAuth()
  const [shouldCheckTransaction, setShouldCheckTransaction] =
    React.useState(false)
  const [activeStep, setActiveStep] = React.useState(0)
  const [promoData, setPromo] = React.useState<Promo | null>(null)
  const [transactionResponse, setTransactionResponse] =
    React.useState<TransactionResponse | null>(null)
  const { data: tiers } = useQuery<ProductionListResponse, Error>(
    ['products'],
    () => ProductService.getProductsByPage(),
    {
      refetchOnWindowFocus: false,
    }
  )
  const { Controller, methods } = useProductForm()

  const { showToast } = useToast()

  React.useEffect(() => {
    if (activeStep === 0) {
      reset()
    }
  }, [activeStep])

  const createTransactionMutation = useMutation<
    TransactionResponse,
    Error,
    CreateTransactionParams
  >((input) => TransactionService.createTransaction(input), {
    onSuccess: (data) => {
      showToast('Product created successfully', { severity: 'success' })
      setActiveStep(activeStep + 1)
      checkTransactionMutation.mutate({
        transaction_id: data.data.transaction_id,
      })
      setTransactionResponse(data)
      setShouldCheckTransaction(true)
    },
    onError: (err: any) => {
      if (err.code && err) {
        showToast(t(`ERROR.${err.code}`), { severity: 'error' })
      } else {
        showToast(t('ERROR.E000070'), { severity: 'error' })
      }
    },
  })

  const promoCheckMutation = useMutation<
    PromoResponse,
    Error,
    PromoApplyParams
  >((input) => PromoService.applyPromo(input), {
    onSuccess: (data) => {
      showToast('Product created successfully', { severity: 'success' })
      if (data) {
        setPromo(data.data)
      }
      //
    },
    onError: (err: any) => {
      setPromo(null)
      if (err.code && err) {
        showToast(t(`ERROR.${err.code}`), { severity: 'error' })
      } else {
        showToast(t('ERROR.E000070'), { severity: 'error' })
      }
    },
  })

  const checkTransactionMutation = useMutation<
    CheckResponse,
    Error,
    CheckTransactionVariables
  >((input) => TransactionService.checkTransactions(input), {
    retry: 10,
    retryDelay: (attemptIndex) => Math.min(3000 * 2 ** attemptIndex, 30000),
    onSuccess: (data) => {
      if (data.is_success) {
        // queryClient.invalidateQueries(['appInit'])
        setActiveStep(activeStep + 1)
        setShouldCheckTransaction(false)
        // use qpay response print something after success payment
      } else {
        // eslint-disable-next-line no-console
        console.log('please wait ...')
      }
    },
    onError: (err: any) => {
      if (err.code && err) {
        showToast(t(`ERROR.${err.code}`), { severity: 'error' })
      } else {
        showToast(t('ERROR.E000070'), { severity: 'error' })
      }
    },
  })

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (shouldCheckTransaction && transactionResponse) {
      intervalId = setInterval(() => {
        checkTransactionMutation.mutate({
          transaction_id: transactionResponse.data.transaction_id,
        })
      }, 3000) // Check every 3 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [shouldCheckTransaction, transactionResponse])

  const {
    control,
    setValue,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = methods

  const selectedProduct = useWatch({
    control,
    name: 'product_id',
  })
  const formData = useWatch({ control })

  const handlePromo = () => {
    const promo = formData.promo_code
    if (!_.isEmpty(promo) && promo) {
      promoCheckMutation.mutate({
        promo_code: promo,
      })
    }
  }

  const handleNext = () => {
    if (activeStep === 1 && isValid) {
      // trigger onSumit form
      handleSubmit((data) => {
        if (data.product_id !== null && !_.isEmpty(data.product_id)) {
          const payload = {
            product_id: _.get(data, 'product_id.product_id', '') as string,
            quantity: data.quantity,
            payment_method: data.payment_method,
            promo_code: _.get(data, 'promo_code', ''),
          }
          createTransactionMutation.mutate(payload)
        }
      })()
    } else {
      setActiveStep(activeStep + 1)
    }
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const isNextStepDisabled =
    (activeStep === 0 && selectedProduct === null) ||
    (activeStep === 1 && !isValid)

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Pricing
              data={tiers}
              selected={selectedProduct as any}
              onChoose={(item: Product) =>
                formData.product_id === item
                  ? setValue('product_id', null)
                  : setValue('product_id', item)
              }
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
                    <Stack direction={'row'} spacing={2}>
                      <OutlinedInput
                        {...field}
                        disabled={promoData !== null}
                        fullWidth
                        placeholder={t('PRODUCT.promo_code')}
                      />
                      <LoadingButton
                        variant="contained"
                        color="primary"
                        disabled={promoData !== null}
                        loading={promoCheckMutation.isLoading}
                        onClick={() => handlePromo()}
                      >
                        {t('PRODUCT.apply')}
                      </LoadingButton>
                    </Stack>
                  )}
                />
              </FormField>
            </Stack>
          </Box>
        )
      case 2:
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Scan QR Code to Pay
            </Typography>
            {transactionResponse && transactionResponse.data.qpay && (
              <img
                src={`data:image/png;base64,${transactionResponse.data.qpay?.qr_image}`}
                alt="QR Code"
                style={{ width: 200, height: 200, marginBottom: 20 }}
              />
            )}
            <Typography variant="body1" gutterBottom>
              Amount:{' '}
              {transactionResponse ? transactionResponse.data.finalAmount : 0}{' '}
              MNT
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Please scan this QR code with your preferred payment app to
              complete the transaction.
            </Typography>
          </Box>
        )
      default:
        throw new Error('Unknown step')
    }
  }

  const handleFormSubmit = () => null

  return (
    <Grid
      container
      sx={{
        pt: 8,
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
        size={{ sm: 12, md: 4, lg: 4 }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          borderRight: { sm: 'none', md: '1px solid' },
          borderColor: { sm: 'none', md: 'divider' },
          alignItems: 'start',
          position: 'relative',
          pt: 16,
          px: { sm: 2, xs: 2, md: 2, lg: 10 },
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
          <Box sx={{ width: 'auto' }}>
            <SitemarkIcon />
          </Box>
          {activeStep === 0 && !selectedProduct && <NoSubscriptionMessage />}
          <Info
            init={init}
            activeStep={activeStep}
            formData={formData}
            promoData={promoData}
          />
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
        size={{ sm: 12, md: 8, lg: 8 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'start',
          pt: { xs: 0, sm: 0, md: 14 },
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
              mt: { xs: 2, md: 2 },
              px: 2,
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
              <InfoMobile
                activeStep={activeStep}
                formData={formData}
                init={init}
                promoData={promoData}
              />
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
              mt: 2,
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' }, mt: 1 }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel sx={{ mt: 1 }}>{label}</StepLabel>
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
                      pb: { xs: 12, sm: 4 },
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
                      {t('SYSCOMMON.previous')}
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
                      {t('SYSCOMMON.previous')}
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    disabled={isNextStepDisabled}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 2
                      ? t('SYSCOMMON.place_order')
                      : t('SYSCOMMON.next')}
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
