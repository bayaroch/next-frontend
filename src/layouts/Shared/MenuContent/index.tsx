import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import { Quickreply } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const mainListItems = [
  { text: 'SYSCOMMON.dashboard', icon: <HomeRoundedIcon />, to: '/' },
  { text: 'SYSCOMMON.automations', icon: <Quickreply />, to: '/automation' },
]

const secondaryListItems = [
  {
    text: 'SYSCOMMON.settings',
    icon: <SettingsRoundedIcon />,
    to: '/settings',
  },
  { text: 'SYSCOMMON.home_page', icon: <InfoRoundedIcon />, to: '/home ' },
  { text: 'SYSCOMMON.feedback', icon: <HelpRoundedIcon />, to: '/feedback ' },
]

const MenuContent: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            component={Link}
            to={item.to}
            key={index}
            disablePadding
            sx={{ display: 'block', color: 'inherit' }}
          >
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.text)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem
            component={Link}
            to={item.to}
            key={index}
            disablePadding
            sx={{ display: 'block', color: 'inherit' }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.text)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
export default MenuContent
