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
  PeopleOutline,
  ProductionQuantityLimitsOutlined,
  QuickreplyOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROLE } from '@services/auth.services'
import RoleWrapper from '@containers/RoleWrapper'

export type MenuItemType = {
  text: string
  icon: React.ReactNode
  to: string
  isExact?: boolean
  matchGroups?: string[]
  allowedRoles: ROLE[]
}

const mainListItems: MenuItemType[] = [
  {
    text: 'SYSCOMMON.dashboard',
    icon: <DashboardOutlined />,
    to: '/',
    isExact: true,
    allowedRoles: [ROLE.USER],
  },
  {
    text: 'SYSCOMMON.automations',
    icon: <QuickreplyOutlined />,
    to: '/automation',
    isExact: true,
    allowedRoles: [ROLE.USER],
  },
  // start admin menus
  {
    text: 'ADMIN.dashboard',
    icon: <DashboardOutlined />,
    to: '/admin',
    isExact: true,
    allowedRoles: [ROLE.ADMIN],
  },
  {
    text: 'ADMIN.products',
    icon: <ProductionQuantityLimitsOutlined />,
    to: '/admin/products',
    isExact: true,
    allowedRoles: [ROLE.ADMIN],
  },
  {
    text: 'ADMIN.sellers',
    icon: <PeopleOutline />,
    to: '/admin/sellers',
    isExact: true,
    allowedRoles: [ROLE.ADMIN],
  },
  // end admin menus
]

const secondaryListItems: MenuItemType[] = [
  {
    text: 'SYSCOMMON.settings',
    icon: <SettingsOutlined />,
    to: '/settings',
    isExact: true,
    allowedRoles: [ROLE.USER],
  },
  {
    text: 'SYSCOMMON.home_page',
    icon: <InfoOutlined />,
    to: '/home',
    isExact: true,
    allowedRoles: [ROLE.USER, ROLE.ADMIN, ROLE.SELLER],
  },
  {
    text: 'SYSCOMMON.feedback',
    icon: <HelpOutlineRounded />,
    to: '/feedback',
    isExact: true,
    allowedRoles: [ROLE.USER, ROLE.ADMIN, ROLE.SELLER],
  },
]

interface MenuContentProps {
  onClick?: () => void
}

const MenuContent: React.FC<MenuContentProps> = ({ onClick }) => {
  const { t } = useTranslation()
  const location = useLocation()

  const renderMenuItem = (item: MenuItemType) => {
    const isSelected =
      item.isExact !== undefined && item.isExact == false
        ? item.matchGroups?.some((route) => matchPath(route, location.pathname))
        : item.to === location.pathname

    return (
      <RoleWrapper
        key={item.to}
        allowedRoles={item.allowedRoles}
        render={({ isDisabled, isConfirmedSeller }) => (
          <ListItem
            component={Link}
            to={item.to}
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
              disabled={
                isDisabled ||
                (item.allowedRoles.includes(ROLE.SELLER) && !isConfirmedSeller)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.text)} />
            </ListItemButton>
          </ListItem>
        )}
      />
    )
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>{mainListItems.map(renderMenuItem)}</List>

      <List dense>{secondaryListItems.map(renderMenuItem)}</List>
    </Stack>
  )
}

export default MenuContent
