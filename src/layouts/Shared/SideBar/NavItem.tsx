import { MenuItemChildren } from '@constants/menu'
import { ListItemIcon, ListItemText, alpha } from '@mui/material'
import Link from '@mui/material/Link'
import ListItemButton from '@mui/material/ListItemButton'
import theme from '@theme/index'
import React from 'react'
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom'

interface NavItemProps {
  item: MenuItemChildren
  isNoBorder?: boolean
  highlightColor?: string
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  isNoBorder = false,
  highlightColor,
}) => {
  const location = useLocation()

  const isSelected =
    item.isExact !== undefined && item.isExact == false
      ? item.matchGroups?.some((route) => matchPath(route, location.pathname))
      : item.uri === location.pathname

  return (
    <ListItemButton
      component={'li'}
      className={isSelected ? 'selected' : ''}
      sx={{
        p: 0,
        overflow: 'hidden',
        borderRadius: isNoBorder ? '0 none ' : '0 24px 24px 0',
        margin: '0',
        '&::before': {
          left: 0,
          top: 0,
          content: `''`,
          position: 'absolute',
          display: 'inline-block',
          width: '4px',
          height: '100%',
          backgroundColor: 'transparent',
        },
        '&:hover': {
          '&::before': {
            left: 0,
            top: 0,
            content: `''`,
            position: 'absolute',
            display: 'inline-block',
            width: '4px',
            height: '100%',
            backgroundColor: highlightColor
              ? highlightColor
              : (theme) => theme.palette.primary.light,
          },
        },
        '&.selected': {
          background: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          '&::before': {
            left: 0,
            top: 0,
            content: `''`,
            position: 'absolute',
            display: 'inline-block',
            width: '4px',
            height: '100%',
            backgroundColor: highlightColor
              ? highlightColor
              : (theme) => theme.palette.primary.light,
          },
        },
      }}
    >
      <Link
        underline={'none'}
        component={RouterLink}
        to={item.uri ? item.uri : ''}
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          color: 'inherit',
          p: (theme) => theme.spacing(1, 3.75),
        }}
      >
        <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          sx={{
            m: 0,
            '& .MuiTypography-root': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        />
      </Link>
    </ListItemButton>
  )
}

export default NavItem
