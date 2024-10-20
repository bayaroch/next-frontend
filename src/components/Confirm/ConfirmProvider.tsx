import React, {
  useState,
  useCallback,
  Fragment,
  PropsWithChildren,
} from 'react'
import ConfirmContext from './ConfirmContext'
import ConfirmationDialog from './ConfirmationDialog'
import { ConfirmOptions } from './types'
import i18n from '@locales/i18n'
import useConfirmDialogForm from './useConfirmDialogForm'

const DEFAULT_OPTIONS = (): ConfirmOptions => {
  const options = {
    title: i18n.t('SYSCOMMON.default_confirm_title'),
    description: '',
    content: null,
    confirmationText: i18n.t('SYSCOMMON.confirm'),
    cancellationText: i18n.t('SYSCOMMON.cancel'),
    dialogProps: {},
    confirmationButtonProps: {},
    cancellationButtonProps: {},
    backDropClose: false,
  }
  return options
}

const buildOptions = (defaultOptions: any, options: any): ConfirmOptions => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS().dialogProps),
    ...(options.dialogProps || {}),
  }
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps ||
      DEFAULT_OPTIONS().confirmationButtonProps),
    ...(options.confirmationButtonProps || {}),
  }
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps ||
      DEFAULT_OPTIONS().cancellationButtonProps),
    ...(options.cancellationButtonProps || {}),
  }

  return {
    ...DEFAULT_OPTIONS(),
    ...defaultOptions,
    ...options,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
  }
}

interface Props extends PropsWithChildren {
  defaultOptions: any
}

const ConfirmProvider: React.FC<Props> = ({
  children,
  defaultOptions = {},
}) => {
  const [options, setOptions] = useState<ConfirmOptions>({
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
  })
  const [resolveReject, setResolveReject] = useState<any[]>([])
  const [resolve, reject] = resolveReject

  const { Controller, methods } = useConfirmDialogForm()

  const {
    control,
    reset,
    formState: { errors, isValid },
  } = methods

  const confirm = useCallback((options: ConfirmOptions = {}): Promise<void> => {
    return new Promise((resolve, reject) => {
      setOptions(buildOptions(defaultOptions, options))
      setResolveReject([resolve, reject])
    })
  }, [])

  const handleClose = useCallback(() => {
    setResolveReject([])
    reset()
  }, [])

  const handleCancel = useCallback(() => {
    reject()
    handleClose()
  }, [reject, handleClose])

  const handleConfirm = useCallback(
    (reason?: string) => {
      resolve(reason)
      handleClose()
    },
    [resolve, handleClose]
  )

  return (
    <Fragment>
      <ConfirmContext.Provider value={confirm}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmationDialog
        formState={{
          Controller: Controller,
          control: control,
          isValid: isValid,
          errors: errors,
        }}
        open={resolveReject.length === 2}
        options={options}
        onClose={(event: Event, reason: string) => {
          if (
            (!options.backDropClose && reason === 'escapeKeyDown') ||
            (!options.backDropClose && reason === 'backdropClick')
          ) {
            event.preventDefault()
          } else {
            handleClose()
          }
        }}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  )
}

export default ConfirmProvider
