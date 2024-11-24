import React from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import { useTranslation } from 'react-i18next'

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}))

// Define a mapping of path segments to labels

const DynamicBreadcrumbs: React.FC = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const { t } = useTranslation()
  const { id } = useParams()

  const isDynamicRoute = id !== undefined
  // eslint-disable-next-line no-console
  console.log(location)

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography component={Link} to="/" variant="body1" color="inherit">
        {t('ROUTES.dashboard')}
      </Typography>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        return last ? (
          <Typography
            key={to}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {isDynamicRoute ? value : t(`ROUTES.${value}`)}
          </Typography>
        ) : (
          <Typography
            key={to}
            component={Link}
            to={to}
            variant="body1"
            color="inherit"
          >
            {t(`ROUTES.${value}`)}
          </Typography>
        )
      })}
    </StyledBreadcrumbs>
  )
}

export default DynamicBreadcrumbs
