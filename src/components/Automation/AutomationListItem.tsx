import React from 'react'
import { ListItem, Box, Typography, Stack, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CommentIcon from '@mui/icons-material/Comment'
import { Automation } from '@services/automation.services'
import moment from 'moment'

interface AutomationListItemProps {
  data: Automation
  onEdit: (automation: Automation) => void
  onDelete: (automation: Automation) => void
}

const AutomationListItem: React.FC<AutomationListItemProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const formattedDate = moment(data.created_at).format('YYYY-MM-DD')
  return (
    <ListItem
      data-test-id="automation-list-item"
      onClick={() => onEdit(data)}
      sx={{
        borderBottom: '1px solid #dedede',
        '&:last-child': {
          borderBottom: '0 none',
        },
        backgroundColor: 'white',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <IconButton
            data-test-id="edit-button"
            edge="end"
            aria-label="edit"
            onClick={() => onEdit(data)}
            size="small"
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            data-test-id="delete-button"
            edge="end"
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(data)
            }}
            size="small"
            color="primary"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          mr: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {data.name}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: 10 }}>
              {formattedDate}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CommentIcon fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: 10 }}>
              {data.comment_responses.length}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </ListItem>
  )
}

export default AutomationListItem
