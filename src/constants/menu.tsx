import i18n from '@locales/i18n'
import { Dashboard } from '@mui/icons-material'
import { ReactNode } from 'react'

export type MenuItemChildren = {
  uri?: string
  label: string
  type: 'nav-item' | 'collapsible'
  icon: ReactNode
  children?: MenuItemChildren[]
  isExact?: boolean
  matchGroups?: string[]
  isAdminOnly?: boolean
}

export type MenuItem = {
  label: string
  type: string
  children: MenuItemChildren[]
  isExact?: boolean
  matchGroups?: string[]
}

const generateMenus = (): MenuItem[] => {
  const menuArray: MenuItem[] = [
    {
      label: i18n.t('SYSCOMMON.home'),
      type: 'section',
      children: [
        {
          uri: '/',
          label: i18n.t('SYSCOMMON.dashboard'),
          type: 'nav-item',
          icon: <Dashboard sx={{ fontSize: 20 }} />,
        },
      ],
    },
  ]

  return menuArray
}

export default generateMenus
