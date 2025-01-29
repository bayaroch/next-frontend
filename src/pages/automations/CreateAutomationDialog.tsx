/* eslint-disable no-console */
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
  FormControlLabel,
  Alert,
  Radio,
  RadioGroup,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Post, Reel } from '@services/page.services'
import { FieldValues, useWatch } from 'react-hook-form'
import AutomationPostItem from '@components/Automation/AutomationPostItem'
import useAutomationCreateForm from './useAutomationCreateForm'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import DataLoading from '@components/DataLoading'
import FormField from '@components/@material-extend/FormField'
import { useAuth } from '@global/AuthContext'
import { LoadingButton } from '@mui/lab'
import { IOSSwitch } from '@components/@material-extend/IOSSwitch'
import { PostType } from '@services/automation.services'
import AutomationReelItem from '@components/Automation/AutomationReelItem'

function isPost(item: any): item is Post {
  return (item as Post).message !== undefined
}

function isReel(item: any): item is Reel {
  return (item as Reel).description !== undefined
}

interface CreateAutomationDialogProps {
  open: boolean
  onClose: () => void
  posts?: {
    data: Post[]
  }
  reels?: {
    data: Reel[]
  }
  isLoadingReels: boolean
  onSubmit: (data: {
    name: string
    fb_page_post_id: string
    is_global: boolean
    post_type: PostType
  }) => void
  isLoading: boolean
  isCreateLoading: boolean
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
  isCreateLoading,
  isLoadingReels,
  reels,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const { Controller, methods } = useAutomationCreateForm()
  const { init } = useAuth()

  const isGlobalExist = !_.isEmpty(
    _.get(init, 'page_info.is_global_automation_exists')
  )

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

  const postType = useWatch({
    control,
    name: 'post_type',
  })

  const isLoadingContent =
    postType === PostType.POSTS ? isLoadingPosts : isLoadingReels

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
      is_global: data.is_global,
      post_type: data.post_type,
    })
  }

  const publishedPosts = _.filter(posts?.data, (post: Post) => {
    return post.is_published
  })

  // Memoize filtered and ordered posts
  const filteredAndOrderedContent = useMemo(() => {
    const content = postType === PostType.POSTS ? publishedPosts : reels?.data

    return _.chain(content)
      .filter((item: Post | Reel) => {
        if (isPost(item)) {
          return (item.message || '')
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        } else if (isReel(item)) {
          return (item.description || '')
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
        }
        return false
      })
      .orderBy(['created_time'], ['desc'])
      .value()
  }, [postType, publishedPosts, reels?.data, debouncedSearchTerm])

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      debouncedSetSearch.cancel()
    }
  }, [debouncedSetSearch])

  const isGlobal = useWatch({
    control,
    name: 'is_global',
    defaultValue: false, // Set a default value
  })

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
          <Box sx={{ width: '100%', mb: 2 }}>
            <Controller
              name="name"
              control={control}
              render={({ field: { ref, ...rest } }: FieldValues) => (
                <FormField
                  fullWidth
                  hidden
                  errors={errors?.name && errors.name.message}
                  label={t('AUTOMATION.name')}
                  desc={t('FORM_DESC.automation_post')}
                  required
                >
                  <OutlinedInput
                    fullWidth
                    {...rest}
                    inputRef={ref}
                    placeholder={t('AUTOMATION.name')}
                    autoComplete={t('AUTOMATION.name')}
                    required
                  />
                </FormField>
              )}
            />
          </Box>
          <Box sx={{ width: '100%', mb: 2 }}>
            <Controller
              name="is_global"
              control={control}
              render={({ field }: FieldValues) => (
                <FormField
                  fullWidth
                  disabled={isGlobalExist}
                  showTyping={false}
                  errors={errors?.is_global && errors.is_global.message}
                  label={t('AUTOMATION.is_global')}
                  desc={t('FORM_DESC.is_global')}
                  required
                >
                  <Box sx={{ ml: 1 }}>
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          checked={field.value === true}
                          onChange={(e) =>
                            field.onChange(e.target.checked ? true : false)
                          }
                        />
                      }
                      label={
                        field.value ? t('SYSCOMMON.yes') : t('SYSCOMMON.no')
                      }
                    />
                  </Box>
                </FormField>
              )}
            />
            {isGlobalExist && (
              <Alert severity="info" variant="outlined">
                {t('AUTOMATION.is_global_exists')}
              </Alert>
            )}
          </Box>
          <Box>
            <Controller
              name="post_type"
              control={control}
              render={({ field }: FieldValues) => (
                <FormField
                  fullWidth
                  showTyping={false}
                  errors={errors?.is_global && errors.is_global.message}
                  label={t('AUTOMATION.post_type')}
                  desc={t('FORM_DESC.post_type')}
                  required
                >
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    {...field}
                  >
                    <FormControlLabel
                      value={PostType.POSTS}
                      control={<Radio />}
                      label={t('AUTOMATION.post')}
                    />
                    <FormControlLabel
                      value={PostType.REELS}
                      control={<Radio />}
                      label={t('AUTOMATION.reel')}
                    />
                  </RadioGroup>
                </FormField>
              )}
            />
          </Box>
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
          {isGlobal !== undefined && Boolean(isGlobal) !== true ? (
            <ScrollableBox>
              <Controller
                name="fb_page_post_id"
                disabled={isGlobal}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    {filteredAndOrderedContent.map((item: any) => {
                      if (isPost(item) && postType === PostType.POSTS) {
                        return (
                          <AutomationPostItem
                            key={item.id}
                            data={item}
                            active={item.id === _.get(value, 'id', null)}
                            onSelect={(v) => onChange(v)}
                          />
                        )
                      } else if (isReel(item) && postType === PostType.REELS) {
                        return (
                          <AutomationReelItem
                            key={item.id}
                            data={item}
                            active={item.id === _.get(value, 'id', null)}
                            onSelect={(v) => onChange(v)}
                          />
                        )
                      }
                      return null
                    })}
                    {isLoadingContent && (
                      <Box
                        sx={{
                          width: '100%',
                          height: '200px',
                          position: 'relative',
                        }}
                      >
                        <DataLoading isLoading={isLoadingContent} />
                      </Box>
                    )}
                  </>
                )}
              />
            </ScrollableBox>
          ) : (
            <Box sx={{ mt: 1 }}>
              <Alert severity="info" variant="outlined">
                {t('AUTOMATION.is_global_alert')}
              </Alert>
            </Box>
          )}
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
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid}
            loading={isCreateLoading}
          >
            {t('SYSCOMMON.create')}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateAutomationDialog
