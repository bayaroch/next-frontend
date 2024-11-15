import React from 'react'
import {
  ListItem,
  Box,
  Typography,
  Stack,
  IconButton,
  Avatar,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import moment from 'moment'
import { Post } from '@services/page.services'
import { ArrowRight } from '@mui/icons-material'
// import _ from 'lodash'

interface AutomationPostItemProps {
  data: Post
  onSelect: (v: Post) => void
  active: boolean
}

const AutomationPostItem: React.FC<AutomationPostItemProps> = ({
  data,
  onSelect,
  active,
}) => {
  const formattedDate = moment(data.created_time).format('YYYY-MM-DD hh:mm')
  return (
    <ListItem
      data-test-id="automation-list-item"
      onClick={() => onSelect(data)}
      sx={{
        pl: 1,
        alignItems: 'flex-start',
        borderBottom: '1px solid #dedede',
        '&:last-child': {
          borderBottom: '0 none',
        },
        backgroundColor: active ? 'theme.primary' : 'white',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
      secondaryAction={
        <IconButton
          data-test-id="delete-button"
          edge="end"
          aria-label="delete"
          onClick={() => onSelect(data)}
          size="small"
          color="primary"
        >
          <ArrowRight />
        </IconButton>
      }
    >
      {data.full_picture && (
        <Avatar
          imgProps={{ loading: 'lazy' }}
          src={data.full_picture}
          sx={{
            position: 'relative',
            objectFit: 'cover',
            borderRadius: '6px',
            width: 100,
            height: 70,
            mr: 2,
          }}
          alt={'fb-image'}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          mr: 1,
          alignItems: 'flex-start',
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            color: 'text.secondary',
            fontSize: '0.875rem',
            mb: 0.5,
          }}
        >
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontSize: 10 }}>
            {formattedDate}
          </Typography>
        </Stack>
        <Box sx={{ height: 45, overflow: 'hidden' }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
            }}
          >
            {data.message ? data.message : 'No message'}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  )
}

export default AutomationPostItem
