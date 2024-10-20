import React, { PropsWithChildren } from 'react'
import { Drawer } from '@mui/material'
import { SIDEBAR } from '@constants/layouts.constants'
import SidebarHeader from './SideBarHeader'
import Scrollbars from 'react-custom-scrollbars-2'

interface SideBarProps extends PropsWithChildren {
  open: boolean
  setSideOpen: (open: boolean) => void
}

const SideBar: React.FC<SideBarProps> = ({ open, setSideOpen, children }) => {
  return (
    <React.Fragment>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            border: 'none',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.085)',
            transition: (theme) => theme.transitions.create(['width']),
            width: SIDEBAR.width,
          },
        }}
        variant={'persistent'}
        anchor={'left'}
        open={open}
        transitionDuration={300}
        ModalProps={{
          keepMounted: true,
        }}
        hideBackdrop={true}
        onClose={() => setSideOpen(false)}
      >
        <Scrollbars
          style={{ width: '100%', height: '100%' }}
          autoHide
          autoHideDuration={200}
          autoHideTimeout={500}
        >
          <SidebarHeader open={open} setSideOpen={setSideOpen} />
          {children}
        </Scrollbars>
      </Drawer>
    </React.Fragment>
  )
}

export default SideBar
