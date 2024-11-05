/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
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

const SurveyPages = () => {
  const { t } = useTranslation()

  return <>Survey</>
}

export default SurveyPages
