import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
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
import useProductForm from './usePurchaseForm'
import { useWatch } from 'react-hook-form'
import FormField from '@components/@material-extend/FormField'
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Paper,
  PaperProps,
  Select,
  styled,
} from '@mui/material'
import _ from 'lodash'
import { useToast } from '@components/ToastProvider'
import { LoadingButton } from '@mui/lab'
import NoSubscriptionMessage from '@components/NoSubscription'
import CheckoutLayout from '@components/@checkout/CheckoutLayout'
import QRCodeComponent from '@components/@checkout/QrCodeComponent'
import CheckoutStepper from '@components/@checkout/CheckoutStepper'
import PaymentComplete from '@components/@checkout/PaymentComplete'
import { Identifier } from '@constants/common.constants'

export const StyledNavigationBox = styled(Paper)<PaperProps>(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  padding: 16,
  borderRadius: 0,
  borderTop: '1px solid #ccc',
}))

export default function Checkout() {
  const { t } = useTranslation()
  const steps = [
    t('PAYMENT.select_plan'),
    t('PAYMENT.place_order'),
    t('PAYMENT.payment_page'),
    t('PAYMENT.complete_page'),
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
      setPromo(null)
    }
  }, [activeStep])

  // eslint-disable-next-line no-console
  console.log(activeStep)

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
      }, 6000) // Check every 3 seconds
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
  const product: Product | undefined = _.get(
    formData,
    'product_id',
    undefined
  ) as any

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

  const renderForm = () => {
    const isFreeProduct = product?.identifier === Identifier.FREE_PRODUCT

    return (
      <>
        <form
          id="create-transaction"
          style={{ width: '100%' }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
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
                      readOnly
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
                      readOnly={isFreeProduct}
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
                      <Select readOnly {...field}>
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
                        disabled={promoData !== null || isFreeProduct}
                        fullWidth
                        placeholder={t('PRODUCT.promo_code')}
                      />
                      <LoadingButton
                        variant="contained"
                        color="primary"
                        disabled={promoData !== null || isFreeProduct}
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
        </form>
      </>
    )
  }

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
            <StyledNavigationBox>
              <Box />
              <LoadingButton
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleNext}
                disabled={selectedProduct === null}
                sx={{ width: { xs: '100%', sm: 'fit-content' } }}
              >
                {t('SYSCOMMON.next')}
              </LoadingButton>
            </StyledNavigationBox>
          </>
        )
      case 1:
        return (
          <>
            {renderForm()}
            <StyledNavigationBox>
              <Button
                startIcon={<ChevronLeftRoundedIcon />}
                onClick={handleBack}
                variant="outlined"
              >
                {t('SYSCOMMON.previous')}
              </Button>
              <LoadingButton
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleNext}
                disabled={!isValid}
                loading={createTransactionMutation.isLoading}
              >
                {t('SYSCOMMON.place_order')}
              </LoadingButton>
            </StyledNavigationBox>
          </>
        )
      case 2:
        return (
          <Box>
            <QRCodeComponent
              isChecking={checkTransactionMutation.isLoading}
              transactionResponse={transactionResponse}
            />
            <StyledNavigationBox>
              <Button
                startIcon={<ChevronLeftRoundedIcon />}
                onClick={handleBack}
                variant="outlined"
              >
                {t('SYSCOMMON.previous')}
              </Button>
              <Box></Box>
            </StyledNavigationBox>
          </Box>
        )
      case 3:
        return (
          checkTransactionMutation?.data && (
            <PaymentComplete data={checkTransactionMutation?.data} />
          )
        )

      default:
        throw new Error('Unknown step')
    }
  }

  const handleFormSubmit = () => null

  React.useEffect(() => {
    if (checkTransactionMutation.data?.is_success) {
      setActiveStep(3) // Move to the complete page
      setShouldCheckTransaction(false)
    }
  }, [checkTransactionMutation.data])

  return (
    <CheckoutLayout
      infoComponent={
        <>
          {activeStep === 0 && !selectedProduct && <NoSubscriptionMessage />}
          <Info
            init={init}
            activeStep={activeStep}
            formData={formData}
            promoData={promoData}
          />
        </>
      }
      infoMobileComponent={
        <InfoMobile
          activeStep={activeStep}
          formData={formData}
          init={init}
          promoData={promoData}
        />
      }
      logout={logout}
      lang={lang}
      changeLanguage={changeLanguage}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        }}
      >
        <CheckoutStepper
          steps={steps}
          activeStep={activeStep}
          isMobile={false}
        />
        <CheckoutStepper
          steps={steps}
          activeStep={activeStep}
          isMobile={true}
        />
        <Box
          sx={{
            minHeight: 500,
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            pt: 2,
            pb: 2,
          }}
        >
          {getStepContent(activeStep)}
        </Box>
      </Box>
      {/* Your form and other content */}
    </CheckoutLayout>
  )
}
