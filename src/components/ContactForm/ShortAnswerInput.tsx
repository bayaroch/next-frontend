import React from 'react'
import { useShortAnswerInput } from 'react-google-forms-hooks'
import { TextField } from '@mui/material'

interface ShortAnswerInputProps {
  id: string
}

const ShortAnswerInput: React.FC<ShortAnswerInputProps> = ({ id }) => {
  const { register } = useShortAnswerInput(id)

  return <TextField fullWidth variant="outlined" {...register()} />
}

export default ShortAnswerInput
