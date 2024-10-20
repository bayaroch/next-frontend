import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import Link from '@mui/material/Link'
import ListItemButton from '@mui/material/ListItemButton'
import {
  Collapse,
  List,
  ListItemIcon,
  Link as MuiLink,
  alpha,
  ListItemText,
  Box,
} from '@mui/material'
import { MenuItemChildren } from '@constants/menu'
import styled from '@mui/material/styles/styled'
import { ArrowDropDown, ArrowRight, Circle } from '@mui/icons-material'
import _ from 'lodash'
import theme from '@theme/index'

interface NavItemProps {
  item: MenuItemChildren
  isNoBorder?: boolean
  highlightColor?: string
}

export const ArrowWrapper = styled('span')({
  position: 'absolute',
  left: 5,
  display: 'inline-flex',
  top: '50%',
  transform: 'translateY(-50%)',
})

const NavCollapseItem: React.FC<NavItemProps> = ({
  item,
  isNoBorder = false,
  highlightColor,
}) => {
  const location = useLocation()
  const [open, setOpen] = useState(
    _.some(item.children, (menuItem) => menuItem?.uri === location.pathname)
  )

  return (
    <>
      <ListItemButton
        component={'li'}
        onClick={() => setOpen(!open)}
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
        }}
      >
        <Box
          component={'span'}
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
          <ArrowWrapper>
            {open ? <ArrowDropDown /> : <ArrowRight />}
          </ArrowWrapper>
        </Box>
      </ListItemButton>

      <Collapse component={'li'} in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {item.children &&
            item.children.map((child) => {
              return (
                <ListItemButton
                  className={child.uri === location.pathname ? 'selected' : ''}
                  key={child.label}
                  component={'li'}
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
                      color: (theme) => theme.palette.primary.main,
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
                  <MuiLink
                    key={child.label}
                    underline={'none'}
                    component={Link}
                    to={child.uri ? child.uri : ''}
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
                    <Circle sx={{ fontSize: 6, ml: 1, mr: 2.2 }} />
                    <ListItemText
                      primary={child.label}
                      sx={{
                        m: 0,
                        '& .MuiTypography-root': {
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        },
                      }}
                    />
                  </MuiLink>
                </ListItemButton>
              )
            })}
        </List>
      </Collapse>
    </>
  )
}

export default NavCollapseItem
