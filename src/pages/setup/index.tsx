/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { AppInitResponse } from '@services/auth.services'
import {
  AdminPagesService,
  FacebookPage,
  PageConnectService,
} from '@services/page.services'
import PageLoader from '@components/InitApp/PageLoader'
import _ from 'lodash'
import Grid from '@mui/material/Grid2'
import SitemarkIcon from '@components/@public/SitemarkIcon'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Radio,
  Avatar,
  Button,
  Typography,
  ListItemAvatar,
  Stack,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import ConnectPages from '@containers/ConnectPages'
import SurveyPages from '@containers/SurveyPages'
import { useAuth } from '@global/AuthContext'
import LanguageSwitcher from '@layouts/Shared/Header/LanguageSwitcher'
import { Languages } from '@constants/common.constants'

const SetupPage = () => {
  const { init, logout, lang, changeLanguage } = useAuth()

  const isSurveyOpen = !!init && _.isEmpty(init?.user_info.survey_responses)
  const isEmptyConnect = !!init && _.isEmpty(init.connected_pages)

  const renderInitContent = () => {
    if (isEmptyConnect && !isSurveyOpen) {
      return <ConnectPages />
    }
    if (
      (isEmptyConnect && isSurveyOpen && init) ||
      (!isEmptyConnect && isSurveyOpen && init)
    ) {
      return <SurveyPages initData={init} />
    }
    return <>asdas</>
  }

  const { t } = useTranslation()

  return (
    <div>
      <Grid
        container
        sx={{
          height: {
            xs: '100%',
            sm: 'calc(100dvh - var(--template-frame-height, 0px))',
          },
          mt: { xs: 4, sm: 4, md: 0 },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'hsl(243.75deg 85.33% 97.59%)',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 16,
            position: 'relatiive',
            px: 10,
            gap: 4,
          }}
        >
          <SitemarkIcon />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: 500,
              gap: 4,
            }}
          >
            <Stack spacing={3}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {t('SYSCOMMON.welcome')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                {t('SYSCOMMON.description1')}
              </Typography>
            </Stack>
          </Box>
          <Button
            variant="text"
            onClick={() => logout()}
            sx={{ position: 'absolute', bottom: 0, mb: 4 }}
          >
            {t('SYSCOMMON.logout')}
          </Button>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            py: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            position: 'relative',
            gap: { xs: 4, md: 8 },
          }}
        >
          <Stack
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              mt: { xs: 0, md: 4 },
              px: 4,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              mr: 4,
            }}
          >
            <Box>
              <Button
                variant="text"
                sx={{ display: { xs: 'auto', md: 'none' } }}
                onClick={() => logout()}
              >
                {t('SYSCOMMON.logout')}
              </Button>
            </Box>
            <Box>
              <LanguageSwitcher
                currentLang={lang}
                data={Languages}
                onSwitch={changeLanguage}
              />
            </Box>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              maxWidth: { sm: '100%', md: '100%' },
              gap: 4,
              height: '100%',
            }}
          >
            {renderInitContent()}
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default SetupPage
