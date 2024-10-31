import { Button, Box, Typography, Container } from '@mui/material'
import {
  GoogleFormProvider,
  useGoogleForm,
  GoogleForm,
} from 'react-google-forms-hooks'
import Questions from './Questions'

interface ContactFormProps {
  form: GoogleForm
}

const ContactForm: React.FC<ContactFormProps> = ({ form }) => {
  const methods = useGoogleForm({ form })

  const onSubmit = async (data: any) => {
    // eslint-disable-next-line no-console
    console.log('Form data:', data)
    await methods.submitToGoogleForms(data)
    alert('Form submitted successfully!')
  }

  return (
    <GoogleFormProvider {...methods}>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          sx={{ mt: 4 }}
        >
          {form.title && (
            <>
              <Typography variant="h4" gutterBottom>
                {form.title}
              </Typography>
              {form.description && (
                <Typography variant="body2" paragraph>
                  {form.description}
                </Typography>
              )}
            </>
          )}
          <Questions fields={form.fields} />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Container>
    </GoogleFormProvider>
  )
}

export default ContactForm
