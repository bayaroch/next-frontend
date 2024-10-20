import * as React from 'react'

import { ButtonProps, DialogProps } from '@mui/material'

export interface ConfirmOptions {
  title?: string
  description?: string
  content?: React.ReactNode | JSX.Element | null
  confirmationText?:string
  cancellationText?: string
  dialogProps?: Omit<DialogProps, 'open'>
  confirmationButtonProps?: ButtonProps
  cancellationButtonProps?: ButtonProps
  additionalText?: React.ReactNode
  backDropClose?: boolean
  additional_confirmation?:string
  sweet_alert?:string
  reason?:boolean
}

export interface ConfirmProviderProps {
  defaultOptions?: ConfirmOptions
}

export const ConfirmProvider: React.ComponentType<ConfirmProviderProps>

export const useConfirm: () => (options?: ConfirmOptions) => Promise<void>
