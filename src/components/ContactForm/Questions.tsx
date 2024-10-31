import React from 'react'
import { Box, Typography } from '@mui/material'
import { Field } from 'react-google-forms-hooks'
import ShortAnswerInput from './ShortAnswerInput'
import LongAnswerInput from './LongAnswerInput'

interface QuestionsProps {
  fields: Field[]
}

const Questions: React.FC<QuestionsProps> = ({ fields }) => {
  const renderInput = (field: Field) => {
    const { id, type } = field

    switch (type) {
      case 'SHORT_ANSWER':
        return <ShortAnswerInput id={id} />
      case 'LONG_ANSWER':
        return <LongAnswerInput id={id} />
      // Add cases for other field types as needed
      default:
        return null
    }
  }

  return (
    <Box>
      {fields.map((field) => (
        <Box key={field.id} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {field.label}
          </Typography>
          {renderInput(field)}
          {field.description && (
            <Typography variant="caption" color="text.secondary">
              {field.description}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Questions
