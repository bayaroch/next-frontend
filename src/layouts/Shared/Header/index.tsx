import Stack from '@mui/material/Stack'
import React from 'react'
import MenuButton from '../MenuButton'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import LanguageSwitcher from './LanguageSwitcher'
import { Languages } from '@constants/common.constants'
import DynamicBreadcrumbs from '../DynamicBreadcrumbs'

interface HeaderProps {
  lang: string
  changeLanguage: (lan: string) => void
}

const Header: React.FC<HeaderProps> = ({ lang, changeLanguage }) => {
  // const [dropdownSearchVisibility, setDropdownSearchVisibility] =
  //   React.useState(false)

  // const showDropdownSearch = useMediaQuery('(max-width:575px)')

  // const width = !isFull ? (open ? SIDEBAR.width : 0) : 0
  // const navigate = useNavigate()

  // const currentLang = user ? user.language.toString() : undefined

  // TODO: language enum shiidegdher string bolgono

  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        borderBottom: '1px solid #e1e5ea',
        px: { xs: 2, md: 4 },
        py: 1,
      }}
      spacing={2}
    >
      <DynamicBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <LanguageSwitcher
          currentLang={lang}
          data={Languages}
          onSwitch={changeLanguage}
        />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
      </Stack>
    </Stack>
  )
}

export default Header
