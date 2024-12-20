import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box, { BoxProps } from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { Stack, Typography } from '@mui/material'
import { ErrorOutline, TopicOutlined } from '@mui/icons-material'

export interface DataLoadingProps extends BoxProps {
  isLoading: boolean
  isEmptyData?: boolean
  resource?: string
  isSearchResult?: boolean
  emptyAction?: React.ReactNode
  resultAction?: React.ReactNode
  emptyDesc?: string
  icon?: React.ReactNode
  error?: any
}

const DataLoading: React.FC<DataLoadingProps> = ({
  isLoading,
  resource,
  isEmptyData = false,
  isSearchResult = false,
  emptyAction,
  resultAction,
  emptyDesc,
  icon,
  error,
  ...rest
}) => {
  const { t } = useTranslation()

  // eslint-disable-next-line no-console
  console.log(isLoading)

  const renderEmptyData = () => {
    if (!isLoading && isEmptyData) {
      return (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            pt: 9,
            pb: 2,
          }}
        >
          <Box
            className="empty-icon"
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 32,
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            {icon ? icon : <TopicOutlined />}
          </Box>
          <Typography
            className="empty-text"
            component={Box}
            variant="body1"
            sx={{ fontSize: 18 }}
          >
            {isSearchResult ? (
              <>
                <Box sx={{ fontWeight: 500, mb: 1 }}>
                  {t('SYSCOMMON.no_data')}
                </Box>
                <Typography component={Box} variant="body1">
                  {t('SYSCOMMON.cant_find')}
                </Typography>
              </>
            ) : (
              <>
                <Box sx={{ fontWeight: 500, mb: 1 }}>
                  {t('SYSCOMMON.no_resources', {
                    resources: resource ? resource : t('SYSCOMMON.data'),
                  })}
                </Box>
              </>
            )}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }} color="#999">
            {emptyDesc
              ? emptyDesc
              : t('SYSCOMMON.empty_desc', {
                  resources: resource ? resource : t('SYSCOMMON.data'),
                })}
          </Typography>
          <Box>
            {emptyAction && !isSearchResult && <Box>{emptyAction}</Box>}
            {resultAction && isSearchResult && <Box>{resultAction}</Box>}
          </Box>
        </Box>
      )
    }
    return null
  }

  const renderError = () => {
    if (error && error.message) {
      return (
        <>
          {' '}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              pt: 9,
              pb: 2,
            }}
          >
            <Box
              className="empty-icon"
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: 32,
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            >
              {<ErrorOutline />}
            </Box>
            <Typography
              className="empty-text"
              component={Box}
              variant="body1"
              sx={{ fontSize: 18 }}
            >
              {t(`ERROR.${error.code}`)}
            </Typography>
          </Box>
        </>
      )
    }
    return null
  }

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: 200,
          }}
          {...rest}
        >
          <Box sx={{ height: '100%' }}>
            <Stack spacing={2} direction={'row'}>
              <CircularProgress size={16} />
              <Box>
                {resource
                  ? t('SYSCOMMON.loading_resource', {
                      resources: resource,
                    })
                  : ''}
              </Box>
            </Stack>
          </Box>
        </Box>
      ) : (
        ''
      )}
      {renderEmptyData()}
      {renderError()}
    </>
  )
}

export default DataLoading
