import React, { useState } from 'react'
import {
  ListItem,
  Box,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Paper,
  Chip,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import moment from 'moment'
import { Post } from '@services/page.services'
import { ArrowRight } from '@mui/icons-material'
import LinkIcon from '@mui/icons-material/Link'
import VideoIcon from '@mui/icons-material/Videocam'
import PhotoIcon from '@mui/icons-material/Photo'
import EventIcon from '@mui/icons-material/Event'
import NoteIcon from '@mui/icons-material/Note'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { t } from 'i18next'
// import _ from 'lodash'

interface AutomationPostItemProps {
  data: Post
  onSelect?: (v: Post) => void
  active?: boolean
}

const AutomationPostItem: React.FC<AutomationPostItemProps> = ({
  data,
  onSelect,
  active,
}) => {
  const [imageError, setImageError] = useState(false)
  const getPostTypeIcon = () => {
    switch (data.icon) {
      case 'https://www.facebook.com/images/icons/post.gif':
        return <LinkIcon />
      case 'https://www.facebook.com/images/icons/video.gif':
        return <VideoIcon />
      case 'https://www.facebook.com/images/icons/photo.gif':
        return <PhotoIcon />
      case 'https://www.facebook.com/images/icons/event.gif':
        return <EventIcon />
      case 'https://www.facebook.com/images/icons/note.gif':
        return <NoteIcon />
      case 'https://www.facebook.com/images/icons/offer.gif':
        return <LocalOfferIcon />
      case 'https://www.facebook.com/images/icons/status.gif':
      default:
        return <ChatBubbleIcon />
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }
  const formattedDate = moment(data.created_time).format('YYYY-MM-DD hh:mm')
  return (
    <ListItem
      component={Paper}
      elevation={2}
      data-test-id="automation-list-item"
      onClick={() => !data?.is_used && onSelect && onSelect(data)}
      sx={{
        pl: 1,
        mb: 2,
        alignItems: 'flex-start',
        border: '0 none',
        '&:last-child': {
          borderBottom: '0 none',
        },
        backgroundColor: active
          ? (theme) => theme.palette.primary.main
          : 'white',
        cursor: data.is_used ? 'inherit' : 'pointer',
        '&:hover': {
          backgroundColor: active
            ? (theme) => theme.palette.primary.main
            : 'rgba(0, 0, 0, 0.04)',
        },
      }}
      secondaryAction={
        <>
          {onSelect && !data?.is_used && (
            <IconButton
              data-test-id="delete-button"
              edge="end"
              aria-label="delete"
              onClick={() => !data?.is_used && onSelect && onSelect(data)}
              size="small"
              color="primary"
            >
              <ArrowRight />
            </IconButton>
          )}
          {data?.is_used && <Chip label={t('SYSCOMMON.used')} />}
        </>
      }
    >
      {data.full_picture && !imageError ? (
        <Avatar
          imgProps={{
            loading: 'lazy',
            onError: handleImageError,
          }}
          src={data.full_picture}
          sx={{
            position: 'relative',
            objectFit: 'cover',
            borderRadius: '6px',
            background: '#ccc',
            width: 100,
            height: 70,
            mr: 2,
          }}
          alt={'fb-image'}
        />
      ) : (
        <Avatar
          sx={{
            width: 100,
            height: 70,
            mr: 2,
            borderRadius: '6px',
            backgroundColor: 'action.selected',
          }}
        >
          {getPostTypeIcon()}
        </Avatar>
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
          <AccessTimeIcon
            sx={{ color: active ? '#eee' : 'inherit' }}
            fontSize="small"
          />
          <Typography
            variant="body2"
            sx={{ fontSize: 10, color: active ? '#eee' : 'inherit' }}
          >
            {formattedDate}
          </Typography>
        </Stack>
        <Box sx={{ height: 45, overflow: 'hidden', pr: 10 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              color: active ? '#eee' : 'inherit',
              mb: 1,
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
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
