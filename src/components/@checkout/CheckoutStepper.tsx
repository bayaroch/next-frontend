import React from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'

interface CheckoutStepperProps {
  steps: string[]
  activeStep: number
  isMobile: boolean
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({
  steps,
  activeStep,
  isMobile,
}) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel={isMobile}
      sx={{
        display: isMobile
          ? { sm: 'flex', md: 'none' }
          : { xs: 'none', md: 'flex' },
        width: '100%',
        height: 40,
      }}
    >
      {steps.map((label) => (
        <Step
          key={label}
          sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
        >
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default CheckoutStepper
