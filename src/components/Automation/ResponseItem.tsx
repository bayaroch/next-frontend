// blank component ResponseItem
import { Delete, Edit } from '@mui/icons-material'
import {
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material'
import { CommentResponse } from '@services/automation.services'
import React from 'react'

export interface ResponseField extends CommentResponse {
  id: string
}

export type ResponseItemProps = {
  response: ResponseField
  isChecked?: boolean
  onDelete?: (field: ResponseField) => void
  onEdit?: (field: ResponseField) => void
}

const ResponseItem: React.FC<ResponseItemProps> = ({
  response,
  isChecked,
  onDelete,
  onEdit,
}) => {
  // eslint-disable-next-line no-console
  console.log(response, 'what is this')
  return (
    <Paper elevation={2} sx={{ width: '100%', background: '#fff' }}>
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
            <IconButton
              onClick={() => onDelete && onDelete(response)}
              edge="end"
              aria-label="comments"
            >
              <Delete />
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
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Chip color="primary" size={'small'} label={response.keyword} />
          }
          secondary={response.content}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    </Paper>
  )
}

export default ResponseItem
