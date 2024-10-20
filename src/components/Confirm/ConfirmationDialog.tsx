import i18n from '@locales/i18n'
import { WarningRounded } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grow,
  TextField,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import React from 'react'
import { FieldValues, useWatch } from 'react-hook-form'
import { ConfirmOptions } from './types'

interface ConfirmationDialogProps {
  open: boolean
  options: ConfirmOptions
  onCancel: () => void
  onConfirm: (v?: string) => void
  onClose: (event: Event, reason: string) => void
  formState: any
}

const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Grow ref={ref} {...props} />
})

const SweetSuccessIcon = () => {
  return (
    <Box sx={{ margin: '0 auto', width: 88, mb: 1, mt: 1 }}>
      <Box className="sa-success">
        <Box className="sa-success-tip" />
        <Box className="sa-success-long" />
        <Box className="sa-success-placeholder" />
        <Box className="sa-success-fix" />
      </Box>
    </Box>
  )
}

const SweetWarningIcon = () => {
  return (
    <Box sx={{ margin: '0 auto', width: 88, mb: 1, mt: 1 }}>
      <Box className="sa-error">
        <Box className="sa-error-x">
          <Box className="sa-error-left"></Box>
          <Box className="sa-error-right"></Box>
        </Box>
        <Box className="sa-error-placeholder"></Box>
        <Box className="sa-error-fix"></Box>
      </Box>
    </Box>
  )
}

const TransitionDefault = React.forwardRef(function Transition(
  props: any,
  ref
) {
  return <Fade ref={ref} {...props} />
})

const ConfirmationDialog = ({
  open,
  options,
  onCancel,
  onConfirm,
  onClose,
  formState,
}: ConfirmationDialogProps) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    additionalText,
    additional_confirmation,
    sweet_alert,
    reason,
  } = options

  const { isValid, Controller, control, errors } = formState

  const value = useWatch({ control, name: 'confirm' })
  const reasonValue = useWatch({ control, name: 'reason' })

  const confirmButton = {
    disabled:
      (!isValid &&
        !!additional_confirmation &&
        additional_confirmation !== value) ||
      (!isValid && !!reason && _.isEmpty(reasonValue)),
    ..._.omit(confirmationButtonProps, 'disabled'),
  }

  return (
    <Dialog
      {...dialogProps}
      fullWidth
      open={open}
      onClose={onClose}
      TransitionComponent={sweet_alert ? Transition : TransitionDefault}
      disableRestoreFocus
    >
      <Container data-test-id="confirmation-component" maxWidth={false}>
        {title && (
          <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
        )}
        {content ? (
          <DialogContent>{content}</DialogContent>
        ) : (
          <DialogContent>
            {sweet_alert && (
              <Box>
                {sweet_alert === 'success' ? (
                  <SweetSuccessIcon />
                ) : (
                  <Box>
                    <SweetWarningIcon />
                  </Box>
                )}
              </Box>
            )}
            {description && (
              <DialogContentText>{description}</DialogContentText>
            )}
            {additional_confirmation && (
              <Box sx={{ mt: 2 }}>
                <Controller
                  name="confirm"
                  control={control}
                  rules={{
                    validate: (value: string) =>
                      value === additional_confirmation,
                    required: true,
                  }}
                  render={({ field: { ref, ...rest } }: FieldValues) => (
                    <TextField
                      {...rest}
                      inputRef={ref}
                      required
                      fullWidth
                      labelPrimary={i18n.t(
                        'SYSCOMMON.additional_confirm_label',
                        {
                          confirm: additional_confirmation,
                        }
                      )}
                      placeholder={additional_confirmation}
                      error={errors.confirm ? true : false}
                      isHelperShow={false}
                    />
                  )}
                />
              </Box>
            )}
            {reason && (
              <Box sx={{ mt: 2 }}>
                <Controller
                  name="reason"
                  control={control}
                  render={({ field: { ref, ...rest } }: FieldValues) => (
                    <TextField
                      {...rest}
                      inputRef={ref}
                      required
                      multiline
                      rows={3}
                      fullWidth
                      labelPrimary={i18n.t('SYSCOMMON.reason')}
                      placeholder={i18n.t('SYSCOMMON.reason')}
                      error={errors.reason ? true : false}
                      isHelperShow={false}
                    />
                  )}
                />
              </Box>
            )}
          </DialogContent>
        )}
        <DialogActions>
          {!sweet_alert && (
            <Button
              data-test-id="cancellation-button"
              {...cancellationButtonProps}
              onClick={onCancel}
            >
              {cancellationText}
            </Button>
          )}
          <Button
            data-test-id="confirmation-button"
            {...confirmButton}
            onClick={() => {
              onConfirm(reasonValue)
            }}
          >
            {confirmationText}
          </Button>
        </DialogActions>
        {additionalText && (
          <Typography variant="body1" component="p">
            <WarningRounded fontSize="small" />
            {additionalText}
          </Typography>
        )}
      </Container>
    </Dialog>
  )
}

export default ConfirmationDialog
