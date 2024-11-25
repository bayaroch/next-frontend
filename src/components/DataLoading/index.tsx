import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box, { BoxProps } from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { Stack, Typography } from '@mui/material'

export interface DataLoadingProps extends BoxProps {
  isLoading: boolean
  isEmptyData?: boolean
  resource?: string
  isSearchResult?: boolean
  emptyAction?: React.ReactNode
  resultAction?: React.ReactNode
  emptyDataSx?: any
}

const DataLoading: React.FC<DataLoadingProps> = ({
  isLoading,
  resource,
  isEmptyData = false,
  isSearchResult = false,
  emptyAction,
  resultAction,
  emptyDataSx,
  ...rest
}) => {
  const { t } = useTranslation()

  const renderEmptyData = () => {
    if (!isLoading && isEmptyData) {
      return (
        <Box sx={emptyDataSx}>
          <Typography component={Box} variant="body1" sx={{ mb: 1 }}>
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
          {emptyAction && !isSearchResult && <Box>{emptyAction}</Box>}
          {resultAction && isSearchResult && <Box>{resultAction}</Box>}
        </Box>
      )
    }
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      {...rest}
    >
      {isLoading ? (
        <Box sx={{ height: '100%' }}>
          <Stack spacing={2} direction={'row'}>
            <CircularProgress size={20} />
            <Box>
              {resource
                ? t('SYSCOMMON.loading_resource', {
                    resources: resource,
                  })
                : ''}
            </Box>
          </Stack>
        </Box>
      ) : (
        ''
      )}
      {renderEmptyData()}
    </Box>
  )
}

export default DataLoading
