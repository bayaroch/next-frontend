import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import {
  DashboardOutlined,
  HelpOutlineRounded,
  InfoOutlined,
  QuickreplyOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export type MenuItemType = {
  text: string
  icon: any
  to: string
  isExact?: boolean
  matchGroups?: string[]
}

const mainListItems: MenuItemType[] = [
  {
    text: 'SYSCOMMON.dashboard',
    icon: <DashboardOutlined />,
    to: '/',
    isExact: true,
  },
  {
    text: 'SYSCOMMON.automations',
    icon: <QuickreplyOutlined />,
    to: '/automation',
    isExact: true,
  },
]

const secondaryListItems: MenuItemType[] = [
  {
    text: 'SYSCOMMON.settings',
    icon: <SettingsOutlined />,
    to: '/settings',
    isExact: true,
  },
  {
    text: 'SYSCOMMON.home_page',
    icon: <InfoOutlined />,
    to: '/home ',
    isExact: true,
  },
  {
    text: 'SYSCOMMON.feedback',
    icon: <HelpOutlineRounded />,
    to: '/feedback ',
    isExact: true,
  },
]

interface MenuContentProps {
  onClick?: () => void
}

const MenuContent: React.FC<MenuContentProps> = ({ onClick }) => {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => {
          const isSelected =
            item.isExact !== undefined && item.isExact == false
              ? item.matchGroups?.some((route) =>
                  matchPath(route, location.pathname)
                )
              : item.to === location.pathname
          return (
            <ListItem
              component={Link}
              to={item.to}
              key={index}
              disablePadding
              sx={{ display: 'block', color: 'inherit' }}
              onClick={() => onClick && onClick()}
            >
              <ListItemButton
                sx={{
                  '&.Mui-selected': {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
                selected={isSelected}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={t(item.text)} />
              </ListItemButton>
            </ListItem>
          )
        })}
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
