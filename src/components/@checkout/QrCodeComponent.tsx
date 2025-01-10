import React from 'react'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TransactionResponse } from '@services/payment.services'

interface QRCodeComponentProps {
  transactionResponse: TransactionResponse | null
  isChecking?: boolean
}

const QRCodeComponent: React.FC<QRCodeComponentProps> = ({
  transactionResponse,
  isChecking,
}) => {
  const { t } = useTranslation()

  const dotAnimationStyle = `
    @keyframes dotAnimation {
      0% { content: '(0)'; }
      20% { content: '(1)'; }
      40% { content: '(2)'; }
      60% { content: '(3)'; }
      80% { content: '(4)'; }
      100% { content: '(5)'; }
    }

    .dot-animation::after {
      content: '';
      animation: dotAnimation 5s infinite;
    }
  `

  const isFreeProduct =
    transactionResponse && transactionResponse.data.finalAmount === 0

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <style>{dotAnimationStyle}</style>
      {!isFreeProduct && (
        <>
          <Typography variant="h6" gutterBottom>
            {t('PAYMENT.scan_qr')}
          </Typography>
          {transactionResponse && transactionResponse.data.qpay && (
            <img
              src={`data:image/png;base64,${transactionResponse.data.qpay?.qr_image}`}
              alt="QR Code"
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
          )}
          <Typography variant="body1" gutterBottom>
            {t('PRODUCT.total_price')}:{' '}
            {transactionResponse ? transactionResponse.data.finalAmount : 0} MNT
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t('PAYMENT.scan_qr_desc')}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {isChecking ? (
              <Stack direction={'row'} alignItems={'centter'} spacing={2}>
                <Box>{t('PAYMENT.checking')}</Box>
                <CircularProgress size={16} />
              </Stack>
            ) : (
              <>
                {`${t('PAYMENT.waiting')}`}
                <span style={{ paddingLeft: 5 }} className="dot-animation" />
              </>
            )}
          </Typography>
        </>
      )}
      {isFreeProduct && (
        <>
          <Typography variant="h6" gutterBottom>
            {t('PAYMENT.activating_free_plan')}
          </Typography>
          <Typography>
            {isChecking ? (
              <Stack direction={'row'} alignItems={'centter'} spacing={2}>
                <Box>{t('PAYMENT.checking')}</Box>
                <CircularProgress size={16} />
              </Stack>
            ) : (
              <>
                {`${t('PAYMENT.waiting')}`}
                <span className="dot-animation" />
              </>
            )}
          </Typography>
        </>
      )}
    </Box>
  )
}

export default QRCodeComponent
