import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  Box,
} from '@mui/material'
import { useCallback, useState } from 'react'

import { Language } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { LanguageItem } from '@constants/common.constants'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LanguageSwitcherProps {
  currentLang?: string
  data: LanguageItem[]
  onSwitch: (id: string) => void
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  data,
  onSwitch,
  currentLang,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)

  const handleClick = useCallback((event: any) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleSwitch = useCallback((id: string) => {
    handleClose()
    onSwitch(id)
  }, [])

  return (
    <>
      <Button
        data-test-id="language-button"
        startIcon={<Language />}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        variant="outlined"
        color={'inherit'}
        sx={{
          border: '1px solid #ccc',
          '& .MuiButton-startIcon': {
            xs: {
              display: 'none',
            },
            sm: {
              display: 'none',
            },
            md: { display: 'inherit' },
          },
        }}
        size="small"
      >
        {currentLang ? currentLang : null}
      </Button>
      <Menu
        data-test-id="language-menu"
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        aria-controls={isOpen ? 'demo-positioned-menu' : undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          mr: 6,
          mt: -1,
          p: 0,
        }}
      >
        <Box>
          <List disablePadding>
            {data.map((item) => {
              return (
                <ListItemButton
                  data-test-id="language-menu-item"
                  key={item.id}
                  onClick={() => {
                    handleSwitch(item.id)
                  }}
                >
                  <ListItemText primary={item.shortLabel} sx={{ my: 0 }} />
                </ListItemButton>
              )
            })}
          </List>
        </Box>
      </Menu>
    </>
  )
}
export default LanguageSwitcher
