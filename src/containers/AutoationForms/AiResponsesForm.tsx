import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  OutlinedInput,
  TextField,
  Badge,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { Add, Delete, CommentOutlined } from '@mui/icons-material'
import _ from 'lodash'

import { useFormContext } from './FormProvider'
import FormField from '@components/@material-extend/FormField'
import ResponseItem, {
  ResponseField,
} from '@components/Automation/ResponseItem'
import DataLoading from '@components/DataLoading'
import { Automation } from '@services/automation.services'

interface AiResponsesFormProps {
  isAiActive?: boolean
  instantOnly?: boolean
  isLoadingAutomations: boolean
  automation: Automation
  handleOpen: () => void
  handleDeleteMultiple: () => void
  handleEdit: (index: number, field: ResponseField) => void
  isUpdating: boolean
  selectedResponses: string[]
  focused: {
    active: string
    fields: ResponseField[]
  } | null
  setFocused: (
    v: {
      active: string
      fields: ResponseField[]
    } | null
  ) => void
  handleCheckResponse: (field: ResponseField) => void
}

const AiResponsesForm: React.FC<AiResponsesFormProps> = ({
  isAiActive,
  instantOnly,
  isLoadingAutomations,
  automation,
  handleOpen,
  handleDeleteMultiple,
  handleEdit,
  isUpdating,
  selectedResponses,
  focused,
  setFocused,
  handleCheckResponse,
}) => {
  const { t } = useTranslation()
  const {
    control,
    setValue,
    formState: { errors },
    fields,
  } = useFormContext<{ comment_responses: ResponseField[] }>()

  if (!isAiActive || instantOnly) return null

  return (
    <>
      <Stack
        direction={'row'}
        width={'100%'}
        mb={2}
        justifyContent={'space-between'}
      >
        <Box>
          <Badge
            color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            badgeContent="PRO"
          >
            <Typography variant="h6">{t('AUTOMATION.responses_ai')}</Typography>
          </Badge>
        </Box>
        <Stack direction="row" spacing={2}>
          {selectedResponses.length > 0 && (
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={handleDeleteMultiple}
              startIcon={<Delete />}
            >
              {t('SYSCOMMON.delete')} ({selectedResponses.length})
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            color={'primary'}
            onClick={handleOpen}
            endIcon={<Add />}
          >
            {t('SYSCOMMON.add')}
          </Button>
        </Stack>
      </Stack>
      {_.orderBy(fields, ['keyword'], ['asc']).map((field, index) => {
        const isActive = focused?.active === field.id
        const correctIndex = fields.findIndex((f) => f.id === field.id)
        return isActive ? (
          <Card
            key={field.id}
            sx={{
              boxShadow: 2,
              position: 'relative',
              mb: 1,
              p: 2,
              background: '#fff',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Controller
                name={`comment_responses.${correctIndex}.keyword`}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <FormField
                    label={t('AUTOMATION.keyword')}
                    required
                    helpContent={t('AUTOMATION.keyword_help')}
                    fullWidth
                    errors={
                      errors.comment_responses?.[correctIndex]?.keyword?.message
                    }
                  >
                    <OutlinedInput
                      {...rest}
                      fullWidth
                      error={
                        !!errors.comment_responses?.[correctIndex]?.keyword
                      }
                      inputRef={ref}
                      placeholder={t('AUTOMATION.keyword')}
                      required
                    />
                  </FormField>
                )}
              />

              <Controller
                name={`comment_responses.${correctIndex}.content`}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <FormField
                    label={t('AUTOMATION.content')}
                    fullWidth
                    required
                    helpContent={t('AUTOMATION.content_help')}
                    errors={
                      errors.comment_responses?.[correctIndex]?.content?.message
                    }
                  >
                    <TextField
                      {...rest}
                      multiline
                      fullWidth
                      variant="outlined"
                      inputRef={ref}
                      minRows={3}
                      placeholder={t('AUTOMATION.content')}
                      slotProps={{
                        input: {
                          sx: {
                            padding: '8px',
                            height: '100%',
                            overflow: 'auto',
                            maxHeight: '80px',
                          },
                        },
                      }}
                    />
                  </FormField>
                )}
              />

              <Controller
                name={`comment_responses.${correctIndex}.chat`}
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <FormField
                    label={t('AUTOMATION.chat')}
                    sx={{ mt: 1 }}
                    fullWidth
                    required
                    helpContent={t('AUTOMATION.chat_hhelp')}
                    errors={
                      errors.comment_responses?.[correctIndex]?.chat?.message
                    }
                  >
                    <TextField
                      {...rest}
                      multiline
                      fullWidth
                      variant="outlined"
                      inputRef={ref}
                      minRows={3}
                      placeholder={t('AUTOMATION.chat')}
                      slotProps={{
                        input: {
                          sx: {
                            padding: '8px',
                            height: '100%',
                            overflow: 'auto',
                            maxHeight: '80px',
                          },
                        },
                      }}
                    />
                  </FormField>
                )}
              />

              <Stack
                direction={'row'}
                spacing={2}
                mt={1}
                sx={{
                  width: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setValue('comment_responses', focused!.fields, {
                      shouldValidate: true,
                    })
                    setFocused(null)
                  }}
                >
                  {t('SYSCOMMON.cancel')}
                </Button>
                <LoadingButton
                  loading={isUpdating}
                  size="small"
                  variant="contained"
                  onClick={() => handleEdit(index, field)}
                >
                  {t('SYSCOMMON.save')}
                </LoadingButton>
              </Stack>
            </Box>
          </Card>
        ) : (
          <ResponseItem
            isChecked={selectedResponses.includes(field.keyword)}
            onCheck={handleCheckResponse}
            key={field.id}
            onEdit={(response) => {
              setFocused({
                active: response.id,
                fields: [...fields],
              })
            }}
            response={field}
          />
        )
      })}

      <DataLoading
        icon={<CommentOutlined />}
        isLoading={isLoadingAutomations}
        resource={t('AUTOMATION.comment_responses')}
        isEmptyData={automation && _.isEmpty(automation.comment_responses)}
        emptyAction={
          <Button
            variant="outlined"
            onClick={handleOpen}
            color="primary"
            endIcon={<Add />}
          >
            {t('SYSCOMMON.add')}
          </Button>
        }
      />
    </>
  )
}

export default AiResponsesForm
