import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import _ from 'lodash'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useMutation, useQueryClient } from 'react-query'
import { ConnectedPage } from '@services/auth.services'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageSwitchService } from '@services/page.services'
import { useTranslation } from 'react-i18next'
import { Check } from '@mui/icons-material'
import { useAuth } from '@global/AuthContext'
import { useConfirm } from '@components/Confirm'
import { Box } from '@mui/material'

export default function SelectContent() {
  const { init } = useAuth()
  const connectedPages = _.get(init, 'connected_pages', [])
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const confirm = useConfirm()

  const current = _.get(init, 'page_info.fb_page_id', '')
  const queryClient = useQueryClient()
  const switchPageMutation = useMutation(PageSwitchService, {
    onSuccess: () => {
      queryClient.invalidateQueries('appInit')
      // check if current  route has id params
      if (id) {
        navigate(`/`)
      }
    },
  })

  const handleChange = (event: SelectChangeEvent) => {
    // confirm before change
    const value = event.target.value
    if (value !== current) {
      //confirm dialog
      confirm({
        title: t('SYSCOMMON.switch_page'),
        description: t('SYSCOMMON.switch_page_desc'),
        confirmationText: t('SYSCOMMON.switch'),
      })
        .then(() => {
          switchPageMutation.mutate({ fb_page_id: value })
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('Cancel')
        })
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={current}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select company' }}
      fullWidth
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      sx={{
        maxHeight: 56,
        width: 215,
        '&.MuiList-root': {
          p: '8px',
        },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>
        {t('SYSCOMMON.connected_pages')}
      </ListSubheader>
      {connectedPages &&
        connectedPages.map((p: ConnectedPage) => {
          return (
            <MenuItem
              onClick={() => {
                handleClose() // Close the select when clicking this item
              }}
              key={p.fb_page_id}
              value={p.fb_page_id}
            >
              {p.is_default_page ? (
                <Check sx={{ fontSize: 10, mr: 1 }} />
              ) : (
                <Box sx={{ width: 18 }}></Box>
              )}
              <ListItemText primary={p.fb_name} />
            </MenuItem>
          )
        })}

      <Divider sx={{ mx: -1 }} />
      <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/connect">
        <MenuItem
          onClick={() => {
            handleClose() // Close the select when clicking this item
          }}
          value={40}
        >
          <ListItemIcon>
            <AddRoundedIcon />
          </ListItemIcon>

          <ListItemText primary={t('SYSCOMMON.add_new_page')} />
        </MenuItem>
      </Link>
    </Select>
  )
}
