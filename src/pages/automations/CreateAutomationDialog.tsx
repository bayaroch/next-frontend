import React, { useState, useMemo, useCallback } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  OutlinedInput,
  styled,
  IconButton,
  TextField,
  Stack,
  Paper,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import CloseIcon from '@mui/icons-material/Close'
import { Post } from '@services/page.services'
import { FieldValues } from 'react-hook-form'
import AutomationPostItem from '@components/Automation/AutomationPostItem'
import useAutomationCreateForm from './useAutomationCreateForm'
import _ from 'lodash'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

interface CreateAutomationDialogProps {
  open: boolean
  onClose: () => void
  posts?: {
    data: Post[]
  }
  onSubmit: (data: { name: string; fb_page_post_id: string }) => void
}

const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  height: 'calc(100vh - 120px)',
  overflow: 'hidden',
})

const ScrollableBox = styled(Paper)({
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '9px',
})

const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const CreateAutomationDialog: React.FC<CreateAutomationDialogProps> = ({
  open,
  onClose,
  posts,
  onSubmit,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { Controller, methods } = useAutomationCreateForm()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  // Debounced search handler
  const debouncedSetSearch = useCallback(
    _.debounce((value: string) => {
      setDebouncedSearchTerm(value)
    }, 300),
    []
  )

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value) // Update the input value immediately for UX
    debouncedSetSearch(value) // Debounce the actual filtering
  }

  const handleFormSubmit = (data: any) => {
    onSubmit({
      name: data.name,
      fb_page_post_id: data.fb_page_post_id?.id,
    })
  }

  const publishedPosts = _.filter(posts?.data, (post: Post) => {
    return post.is_published
  })

  // Memoize filtered and ordered posts
  const filteredAndOrderedPosts = useMemo(() => {
    //also filter by is_published true

    return _.chain(publishedPosts)
      .filter((post: Post) => {
        // Handle case where message might be undefined
        const message = post.message || ''
        return message.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      })
      .orderBy(['created_time'], ['desc'])
      .value()
  }, [posts?.data, debouncedSearchTerm])

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSetSearch.cancel()
    }
  }, [debouncedSetSearch])

  return (
    <Dialog fullScreen open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <StyledDialogTitle>
          Create Automation
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          <Controller
            name="name"
            control={control}
            render={({ field: { ref, ...rest } }: FieldValues) => (
              <FormGrid size={{ xs: 12, md: 12 }} sx={{ mb: 2 }}>
                <FormLabel htmlFor="first-name" required>
                  Automation Name:
                </FormLabel>
                <OutlinedInput
                  {...rest}
                  error={!!errors?.name}
                  inputRef={ref}
                  placeholder="Give name"
                  autoComplete="Automation name"
                  required
                />
                {errors?.name && (
                  <FormLabel error>{errors.name.message}</FormLabel>
                )}
              </FormGrid>
            )}
          />

          <Box>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <FormLabel sx={{ minWidth: 150 }}>Select Post:</FormLabel>
              <TextField
                size="small"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Stack>
          </Box>

          <ScrollableBox elevation={2}>
            <Controller
              name="fb_page_post_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  {posts &&
                    filteredAndOrderedPosts.map((p) => (
                      <AutomationPostItem
                        data={p}
                        active={p.id === _.get(value, 'id', null)}
                        onSelect={(v) => onChange(v)}
                        key={p.id}
                      />
                    ))}
                </>
              )}
            />
          </ScrollableBox>
        </StyledDialogContent>
        <DialogActions
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid}
          >
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateAutomationDialog
