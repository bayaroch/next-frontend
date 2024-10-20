import React from 'react'
import Box from '@mui/material/Box'
import DataLoading from '@components/DataLoading'

const InitAppLoader: React.FC = () => {
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
        transition: 'transform 0.6s ease',
        '&.loaded': {
          visibility: 'hidden',
          opacity: 0,
          transform: 'translate(0)',
        },
      }}
    >
      <DataLoading isLoading={true} />
    </Box>
  )
}

export default InitAppLoader
