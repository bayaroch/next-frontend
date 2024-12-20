import React, { forwardRef, useCallback } from 'react'
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field'
import { OutlinedInput, OutlinedInputProps } from '@mui/material'

interface CurrencyOutlinedInputProps
  extends Omit<CurrencyInputProps, 'customInput'> {
  muiProps?: Partial<OutlinedInputProps>
}

const CurrencyOutlinedInput = forwardRef<
  HTMLInputElement,
  CurrencyOutlinedInputProps
>(({ muiProps, ...currencyInputProps }, ref) => {
  const CustomInput = useCallback(
    (props: OutlinedInputProps) => (
      <OutlinedInput {...muiProps} {...props} inputRef={ref} />
    ),
    [muiProps, ref]
  )

  return <CurrencyInput {...currencyInputProps} customInput={CustomInput} />
})

export default CurrencyOutlinedInput
