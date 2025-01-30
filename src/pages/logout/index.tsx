import DataLoading from '@components/DataLoading'
import { Box } from '@mui/material'
import { useAuth } from 'global/AuthContext'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FacebookLoginClient } from '@containers/FacebookOauth'
const LogOut: React.FC = () => {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    logout()
    FacebookLoginClient.logout((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
    })
  }, [])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  return (
    <Box
      sx={{
        background: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        visibility: 'visible',
        pointerEvents: 'none',
        opacity: 1,
        '&.loaded': {
          visibility: 'hidden',
          opacity: 0,
          transform: 'translate all 0.6s ease ',
        },
      }}
    >
      <DataLoading isLoading={true} />
    </Box>
  )
}

export default LogOut
