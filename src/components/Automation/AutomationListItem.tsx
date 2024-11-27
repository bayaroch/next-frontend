import React, { useState } from 'react'
import {
  ListItem,
  Box,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Stack,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import moment from 'moment'
import { Automation } from '@services/automation.services'
import { useTranslation } from 'react-i18next'

interface AutomationListItemProps {
  data: Automation
  onEdit: (automation: Automation) => void
  onDelete: (automation: Automation) => void
  onSetActive?: (automation: Automation, isActive: boolean) => void
}

const AutomationListItem: React.FC<AutomationListItemProps> = ({
  data,
  onEdit,
  onDelete,
  onSetActive,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const formattedDate = moment(data.updated_at).format('YYYY-MM-DD HH:mm')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const { t } = useTranslation()

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    onEdit(data)
    handleMenuClose()
  }

  const handleDelete = () => {
    onDelete(data)
    handleMenuClose()
  }

  const handleSetActive = () => {
    onSetActive && onSetActive(data, !data.is_active)
    handleMenuClose()
  }

  return (
    <ListItem
      data-test-id="automation-list-item"
      sx={{
        borderBottom: '1px solid #dedede',
        '&:last-child': {
          borderBottom: '0 none',
        },
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        padding: 2,
      }}
    >
      {/* Name Column */}
      <Box sx={{ flex: 2, width: '100%', mb: isMobile ? 2 : 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: 15,
            whiteSpace: 'nowrap',
            maxWidth: { xs: '100%', sm: '200px', md: '300px', lg: '400px' },
          }}
        >
          {data.name}
        </Typography>
      </Box>

      {/* Status Column */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center',
          mb: isMobile ? 2 : 0,
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <Chip
          icon={data.is_active ? <PlayArrowIcon /> : <PauseIcon />}
          label={data.is_active ? 'Active' : 'Paused'}
          color={data.is_active ? 'success' : 'default'}
          variant="outlined"
        />
      </Box>

      <Stack
        spacing={1}
        direction={'row'}
        sx={{
          flex: 1,
          display: !isMobile ? 'flex' : 'none',
          justifyContent: isMobile ? 'flex-start' : 'center',
          mb: isMobile ? 2 : 0,
          width: isMobile ? '100%' : 'auto',
        }}
      >
        <Chip
          label={`${data.comment_responses.length > 1 ? data.comment_responses.length : 'No'} responses`}
          size="small"
          color="primary"
          variant={data.comment_responses.length > 0 ? 'filled' : 'outlined'}
        />
      </Stack>

      {/* Modified Date Column */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: isMobile ? 'space-between' : 'flex-end',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mr: 2, fontSize: 12, color: '#666' }}
        >
          {formattedDate}
        </Typography>

        <IconButton sx={{ border: '0 none', p: 0 }} onClick={handleMenuOpen}>
          <MoreVertIcon
            sx={{ '&.MuiSvgIcon-root': { width: 24, height: 24 } }}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            {t('SYSCOMMON.edit')}
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            {t('SYSCOMMON.delete')}
          </MenuItem>
          <MenuItem onClick={handleSetActive}>
            {data.is_active ? (
              <PauseIcon fontSize="small" sx={{ mr: 1 }} />
            ) : (
              <PlayArrowIcon fontSize="small" sx={{ mr: 1 }} />
            )}
            {data.is_active ? t('AUTOMATION.pause') : t('AUTOMATION.activate')}
          </MenuItem>
        </Menu>
      </Box>
    </ListItem>
  )
}

export default AutomationListItem
