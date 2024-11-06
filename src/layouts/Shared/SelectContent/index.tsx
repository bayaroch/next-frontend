import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import _ from 'lodash'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useQueryClient } from 'react-query'
import { ConnectedPage } from '@services/auth.services'
import { Link } from 'react-router-dom'

export default function SelectContent() {
  const queryClient = useQueryClient()
  const initData = queryClient.getQueryData(['appInit'])
  const connectedPages = _.get(initData, 'connected_pages', [])
  // eslint-disable-next-line no-console
  console.log('im hhere in child', initData)

  const handleChange = (event: SelectChangeEvent) => {
    // eslint-disable-next-line no-console
    console.log(event.target.value)
  }
  const current = _.get(initData, 'page_info.fb_page_id', '')

  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={current}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select company' }}
      fullWidth
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
      <ListSubheader sx={{ pt: 0 }}>Connected pages</ListSubheader>
      {connectedPages &&
        connectedPages.map((p: ConnectedPage) => {
          return (
            <MenuItem key={p.fb_page_id} value={p.fb_page_id}>
              <ListItemText primary={p.fb_name} />
            </MenuItem>
          )
        })}

      <Divider sx={{ mx: -1 }} />
      <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/connect">
        <MenuItem value={40}>
          <ListItemIcon>
            <AddRoundedIcon />
          </ListItemIcon>

          <ListItemText primary="Add new page" />
        </MenuItem>
      </Link>
    </Select>
  )
}
