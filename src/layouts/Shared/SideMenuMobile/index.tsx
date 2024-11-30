import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer, { drawerClasses } from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import MenuButton from '../MenuButton'
import MenuContent from '../MenuContent'
import { AppInitResponse } from '@services/auth.services'
import { useTranslation } from 'react-i18next'

interface SideMenuMobileProps {
  open: boolean
  toggleDrawer: (newOpen: boolean) => void
  initData: AppInitResponse
  onLogout: () => void
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
  onLogout,
  initData,
}: SideMenuMobileProps) {
  const { t } = useTranslation()
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="Riley Carter"
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {initData.user_info.first_name}
            </Typography>
          </Stack>
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent onClick={() => toggleDrawer(false)} />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            onClick={() => onLogout()}
            fullWidth
            startIcon={<LogoutRoundedIcon />}
          >
            {t('SYSCOMMON.logout')}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  )
}
