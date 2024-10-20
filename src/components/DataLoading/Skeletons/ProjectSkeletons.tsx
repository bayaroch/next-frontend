import React from 'react'
import { Box, Paper, Skeleton, Typography } from '@mui/material'

export const MenuSkeleton: React.FC = () => (
  <Paper sx={{ p: 0 }}>
    <Box sx={{ p: 1, pl: 3, borderBottom: '1px solid #eee' }}>
      {/* Skeleton Loader for Back Button */}
      <Skeleton variant="text" width={150} height={30} />
    </Box>
    <Box sx={{ height: 164 }}>
      {/* Skeleton Loader for Menu Items */}
      {Array.from({ length: 4 }).map((_, index) => (
        <Box
          component="span"
          data-test-id={`menu-item-${index}-menu`}
          key={index}
          sx={{
            display: 'block',
            marginBottom: 0.5,
            marginTop: 0.5,
            pl: 3,
            height: 37,
          }}
        >
          <Skeleton variant="text" width={200} height={24} />
        </Box>
      ))}
    </Box>
  </Paper>
)

export const MainSkeleton: React.FC = () => (
  <Box sx={{ height: 139 }}>
    <Skeleton variant="text" width={200} height={30} />

    <Box sx={{ borderBottom: '1px solid #eee', pb: 2 }}>
      <Skeleton variant="text" width={100} height={15} />
    </Box>
    <Box sx={{ mt: 3 }}>
      <Skeleton variant="text" width={100} height={20} />
      <Box>
        {/* Skeleton Loader for Description */}
        <Skeleton variant="text" width={300} height={15} />
      </Box>
    </Box>
  </Box>
)

export const DetailSkeleton: React.FC = () => (
  <>
    <Box
      sx={{
        p: 1,
        pl: 2,
        borderBottom: '1px solid #eee',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h5" sx={{ pt: 1 }}>
        <Skeleton variant="text" width={200} height={30} />
      </Typography>
      <Box sx={{ pt: 1, pr: 1 }}>
        <Skeleton variant="text" width={50} height={30} />
      </Box>
    </Box>
    <Box sx={{ pl: 1 }}>
      <Typography variant="body1" sx={{ p: 1 }}>
        <Skeleton variant="text" width={200} height={15} />
      </Typography>
      <Typography variant="body1" sx={{ p: 1 }}>
        <Skeleton variant="text" width={200} height={15} />
      </Typography>
      <Typography variant="body1" sx={{ p: 1 }}>
        <Skeleton variant="text" width={200} height={15} />
      </Typography>
      <Typography variant="body1" sx={{ p: 1 }}>
        <Skeleton variant="text" width={200} height={15} />
      </Typography>
      <Typography variant="body1" sx={{ p: 1 }}>
        <Skeleton variant="text" width={150} height={15} />
      </Typography>
      <Typography variant="body1" sx={{ p: 1 }}>
        <Skeleton variant="text" width={150} height={15} />
      </Typography>
    </Box>
  </>
)
