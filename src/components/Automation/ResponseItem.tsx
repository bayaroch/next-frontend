import { Edit } from '@mui/icons-material'
import {
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  Stack,
} from '@mui/material'
import { CommentResponse } from '@services/automation.services'
import React from 'react'
import _ from 'lodash'
import { t } from 'i18next'

export interface ResponseField extends CommentResponse {
  id: string
}

export type ResponseItemProps = {
  response: ResponseField
  isChecked: boolean
  onCheck: (field: ResponseField) => void
  onEdit?: (field: ResponseField) => void
}

const ResponseItem: React.FC<ResponseItemProps> = ({
  response,
  isChecked,
  onCheck,
  onEdit,
}) => {
  return (
    <Card sx={{ width: '100%', background: '#fff', mb: 1, p: 0 }}>
      <ListItem
        secondaryAction={
          <Stack spacing={1} direction={'row'}>
            <IconButton
              onClick={() => onEdit && onEdit(response)}
              edge="end"
              aria-label="comments"
            >
              <Edit />
            </IconButton>
          </Stack>
        }
      >
        <ListItemIcon>
          <Checkbox
            sx={{
              border: '0 none',
              '& .MuiButtonbase': { border: '0 none', borderRadius: 0 },
            }}
            edge="start"
            checked={isChecked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': response.keyword }}
            onChange={() => onCheck(response)}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Chip
              color="primary"
              size={'small'}
              label={response.keyword}
              sx={{ mb: 1 }}
            />
          }
          secondary={
            <Stack component={'span'} spacing={1} direction={'row'}>
              {!_.isEmpty(response.content) && (
                <Chip label={t('AUTOMATION.content')} size={'small'} />
              )}
              {!_.isEmpty(response.chat) && (
                <Chip label={t('AUTOMATION.chat')} size={'small'} />
              )}
              {!_.isEmpty(response.attachment) && (
                <Chip label={t('AUTOMATION.attachement')} size={'small'} />
              )}
            </Stack>
          }
        />
      </ListItem>
    </Card>
  )
}

export default ResponseItem
