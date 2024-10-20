import HeaderHome, { headerHeight } from '@components/@landing-page/HeaderHome'
import PublicFooter from '@layouts/Shared/Header/PublicFooter'
import { Box } from '@mui/material'
import React from 'react'
import { use100vh } from 'react-div-100vh'
import { useTranslation } from 'react-i18next'

const Home: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()
  const height = use100vh()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fullHeight = height ? height - headerHeight - 80 : 'auto'

  return (
    <Box sx={{ pt: `${headerHeight}px` }}>
      <HeaderHome />
      Home
      <PublicFooter />
    </Box>
  )
}

export default Home
