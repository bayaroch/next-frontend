import {
  FormHelperText,
  FormHelperTextProps,
  Typography,
  useFormControl,
} from '@mui/material'
import React from 'react'

interface CustomHelperProps extends FormHelperTextProps {
  content?: string
  showTyping?: boolean
}

const CustomFormHelperText: React.FC<CustomHelperProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { content, showTyping = true, ...rest } = props
  const { focused, error } = useFormControl() || {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const helperText = React.useMemo(() => {
    if (focused && !error) {
      return showTyping && 'typing ...'
    }
    // If children is an object, we need to access its value
    return content
  }, [focused, error, content])

  return (
    <FormHelperText sx={{ mx: 0 }} {...rest}>
      <Typography component={'span'} sx={{ fontSize: 11, height: 11 }}>
        {helperText}
      </Typography>
    </FormHelperText>
  )
}

export default CustomFormHelperText
