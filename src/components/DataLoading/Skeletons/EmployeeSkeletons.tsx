import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export const ProfileCardSkeleton = () => {
  return (
    <Box>
      <Paper
        sx={{
          mt: 0,
          overflow: 'hidden',
          flex: 1,
        }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              background: '#eee',
              height: 200,
              mb: 5,
              position: 'relative',
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                backgroundImage:
                  'linear-gradient(180deg,rgba(0,0,0,.01) 0,rgba(0,0,0,.65))',
                padding: {
                  xl: '30px 20px',
                  lg: '10px',
                  md: '10px',
                  sm: '10px',
                  xs: '10px',
                },
              }}
            >
              <Box sx={{ position: 'absolute', bottom: -50, left: 20 }}>
                <Stack direction="row" spacing={2}>
                  <Skeleton
                    variant="circular"
                    width={110}
                    sx={{
                      backgroundColor: '#eee',
                      border: '2px solid rgb(255, 255, 255)',
                    }}
                    height={110}
                    animation="wave"
                  />
                  <Box sx={{ pt: 3 }}>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                      <Skeleton
                        width={150}
                        variant="text"
                        sx={{ backgroundColor: 'rgba(255,255,255, 0.1)' }}
                      />
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#666', pt: 0.5 }}>
                      <Skeleton width={100} variant="text" />
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              p: { xs: 1, sm: 1, md: 2 },
              position: 'relative',
              width: '100%',
            }}
          >
            {Array.from({ length: 3 }, (_, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="start"
                sx={{
                  '&:last-child': {
                    margin: 0,
                  },
                }}
                mb={{ xs: 1, sm: 2 }}
              >
                <Box>
                  <Skeleton width={40} height={40} variant="rectangular" />
                </Box>
                <Box ml={3} mt={0.5}>
                  <Box component="span" color="grey">
                    <Skeleton width={200} height={13} variant="text" />
                  </Box>
                  <Box sx={{ mt: 0.5 }} fontSize={15}>
                    <Skeleton width={200} height={20} variant="text" />
                  </Box>
                </Box>
              </Box>
            ))}
            <Box mt={4}>
              <Skeleton width={200} height={20} variant="text" />
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
