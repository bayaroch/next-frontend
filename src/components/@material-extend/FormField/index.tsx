import { InfoOutlined, Close as CloseIcon } from '@mui/icons-material'
import {
  Box,
  FormLabel,
  FormLabelProps,
  IconButton,
  Stack,
  Typography,
  Popover,
  styled,
  FormControl,
  FormControlProps,
} from '@mui/material'
import React, { useState } from 'react'
import CustomFormHelperText from './CustomFormHelperText'

// Custom styled Popover content
const StyledPopoverContent = styled(Box)({
  backgroundColor: 'white',
  padding: '12px 16px',
  position: 'relative',
  minWidth: 200,
  maxWidth: 300,
})

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 4,
  top: 4,
  padding: 4,
  width: 20,
  height: 20,
  border: '0 none',
})

interface FormFieldProps extends FormControlProps {
  label: string
  errors?: string
  desc?: string
  required?: boolean
  formLabelProps?: FormLabelProps
  helpContent?: React.ReactNode
  disabled?: boolean
  showTyping?: boolean
}

const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    children,
    label,
    errors,
    desc,
    formLabelProps,
    required,
    helpContent,
    disabled,
    showTyping,
    ...rest
  } = props

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <FormControl
      error={!!errors}
      required={required}
      disabled={disabled}
      {...rest}
    >
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <FormLabel sx={{ fontWeight: 500, mb: 0 }} {...formLabelProps}>
          {label}
        </FormLabel>
        {helpContent && (
          <Box component={'span'} sx={{ position: 'relative', top: -2 }}>
            <IconButton
              onClick={handleClick}
              sx={{
                width: 14,
                height: 14,
                borderRadius: 0,
                fontSize: 11,
                border: '0 none',
              }}
              size="small"
            >
              <InfoOutlined fontSize="small" sx={{ fontSize: 9 }} />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiPopover-paper': {
                  boxShadow:
                    'hsla(220, 30%, 5%, 0.05) 0px 5px 10px 0px, hsla(220, 25%, 10%, 0.03) 0px 15px 25px -5px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  mt: 0,
                },
              }}
            >
              <StyledPopoverContent>
                <CloseButton onClick={handleClose} size="small">
                  <CloseIcon sx={{ fontSize: 14 }} />
                </CloseButton>
                <Typography
                  sx={{
                    color: '#222',
                    fontSize: 12,
                    pr: 3,
                    lineHeight: 1.5,
                  }}
                >
                  {helpContent}
                </Typography>
              </StyledPopoverContent>
            </Popover>
          </Box>
        )}
      </Stack>
      <Typography variant="body2" fontSize={11} sx={{ mb: 0.2 }} color="#666">
        {desc}
      </Typography>
      <Box>{children}</Box>
      <Box sx={{ height: 11 }}>
        <CustomFormHelperText content={errors} showTyping={showTyping} />
      </Box>
    </FormControl>
  )
}

export default FormField
