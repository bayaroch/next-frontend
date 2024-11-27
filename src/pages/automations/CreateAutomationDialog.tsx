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
import { useTranslation } from 'react-i18next'
import DataLoading from '@components/DataLoading'

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
  isLoading: boolean
}

const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  height: 'calc(100vh - 120px)',
  overflow: 'hidden',
})

const ScrollableBox = styled(Paper)(() => ({
  flex: 1,
  overflowY: 'auto',
  paddingRight: '10px',
  display: 'flex',
  border: '1px solid #ececec',
  padding: '12px',
  borderRadius: 0,
  flexDirection: 'column',
  marginTop: '9px',
  position: 'relative',

  '&::-webkit-scrollbar': {
    height: '8px',
    width: '8px',
    cursor: 'pointer',
  },

  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#999',
    borderRadius: '10px',
  },

  '&::-webkit-scrollbar-thumb:hover': {
    background: '#777',
  },
}))

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
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { Controller, methods } = useAutomationCreateForm()

  const isLoadingPosts = !posts && isLoading

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  const { t } = useTranslation()

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
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 0,
        },
      }}
      fullScreen
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <StyledDialogTitle>
          {t('AUTOMATION.create_automation')}
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
                  {t('AUTOMATION.name')}
                </FormLabel>
                <OutlinedInput
                  {...rest}
                  error={!!errors?.name}
                  inputRef={ref}
                  placeholder={t('AUTOMATION.name')}
                  autoComplete={t('AUTOMATION.name')}
                  required
                />

                <FormLabel sx={{ fontSize: 11, mb: 0, pt: 0.5 }} error>
                  {errors?.name && errors.name.message}
                </FormLabel>
              </FormGrid>
            )}
          />

          <Box>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <FormLabel sx={{ minWidth: 150 }}>
                {t('AUTOMATION.select_post')}
              </FormLabel>
              <TextField
                size="small"
                placeholder={t('AUTOMATION.search_posts')}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Stack>
          </Box>

          <ScrollableBox>
            <Controller
              name="fb_page_post_id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  {posts &&
                    filteredAndOrderedPosts.map((p) => (
                      <AutomationPostItem
                        key={p.id}
                        data={p}
                        active={p.id === _.get(value, 'id', null)}
                        onSelect={(v) => onChange(v)}
                      />
                    ))}
                  {isLoadingPosts && (
                    <Box
                      sx={{
                        width: '100%',
                        height: '200px',
                        position: 'relative',
                      }}
                    >
                      <DataLoading isLoading={isLoadingPosts} />
                    </Box>
                  )}
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
            borderTop: '1px solid #ccc',
          }}
        >
          <Button onClick={onClose}> {t('SYSCOMMON.cancel')}</Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid}
          >
            {t('SYSCOMMON.create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateAutomationDialog
