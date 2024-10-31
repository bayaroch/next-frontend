import React from 'react'
import { useLongAnswerInput } from 'react-google-forms-hooks'
import { TextField } from '@mui/material'

interface LongAnswerInputProps {
  id: string
}

const LongAnswerInput: React.FC<LongAnswerInputProps> = ({ id }) => {
  const { register } = useLongAnswerInput(id)

  return (
    <TextField
      fullWidth
      variant="outlined"
      multiline
      rows={4}
      {...register()}
    />
  )
}

export default LongAnswerInput
