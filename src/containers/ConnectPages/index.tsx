import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  AdminPagesService,
  FacebookPage,
  PageConnectService,
  PageDisconnectService,
} from '@services/page.services'
import PageLoader from '@components/InitApp/PageLoader'
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  ListItemAvatar,
  Paper,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { useConfirm } from '@components/Confirm'

const ConnectPages = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const confirm = useConfirm()

  //useConfirm hook for confirm dialog

  const { data, isLoading: isLoadingAdminPages } = useQuery({
    queryKey: ['adminPages'],
    queryFn: AdminPagesService,
    enabled: true,
    retry: 2,
  })

  const connectPageMutation = useMutation(PageConnectService, {
    onSuccess: () => {
      queryClient.invalidateQueries('appInit')
      queryClient.invalidateQueries('adminPages')
    },
  })

  const disconnectPageMutation = useMutation(PageDisconnectService, {
    onSuccess: () => {
      queryClient.invalidateQueries('appInit')
      queryClient.invalidateQueries('adminPages')
    },
  })

  if (isLoadingAdminPages) {
    return <PageLoader />
  }

  const handleConnect = (id: string) => {
    if (id) {
      connectPageMutation.mutate({ fb_page_id: id })
    }
  }

  const handleDisconnect = (id: string) => {
    if (id) {
      confirm({
        title: t('SYSCOMMON.disconnect_page'),
        description: t('SYSCOMMON.disconnect_page_desc'),
        confirmationText: t('SYSCOMMON.disconnect'),
        cancellationText: t('SYSCOMMON.cancel'),
      })
        .then(() => {
          disconnectPageMutation.mutate({ fb_page_id: id })
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('Cancel')
        })
    }
  }

  // i wanna make renderButton function that renders loading button differently based on enum status text also disable logic
  const renderButton = (page: FacebookPage) => {
    if (page.status === 'connected') {
      return (
        <LoadingButton
          variant="contained"
          onClick={() => handleDisconnect(page.id)}
          color="secondary"
        >
          {t('SYSCOMMON.disconnect')}
        </LoadingButton>
        // make disconnect button
      )
    } else if (page.status === 'used') {
      return (
        <LoadingButton variant="contained" color="primary" disabled>
          {t('SYSCOMMON.used')}
        </LoadingButton>
      )
    } else {
      return (
        <LoadingButton
          onClick={() => handleConnect(page.id)}
          variant="contained"
          color="primary"
          loading={
            connectPageMutation.isLoading &&
            connectPageMutation.variables?.fb_page_id === page.id
          } // how to get payload of connectPageMutation
          disabled={connectPageMutation.isLoading}
        >
          {t('SYSCOMMON.connect')}
        </LoadingButton>
      )
    }
  }

  return (
    <>
      <Typography variant="h4" component="h1">
        {t('SYSCOMMON.selectPage')}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ lineHeight: 1.7, mb: 2 }}
      >
        {t('SYSCOMMON.description2')}
      </Typography>

      {data && data.data.length > 0 ? (
        <List sx={{ width: '100%', p: 0 }}>
          {data.data.map((page: FacebookPage) => (
            <Paper key={page.id} elevation={2} sx={{ mb: 1 }}>
              <ListItem
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                secondaryAction={renderButton(page)}
              >
                <ListItemAvatar sx={{ mr: 2 }}>
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    src={page.cover.source || undefined}
                    alt={page.name}
                  >
                    {page.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={page.name}
                  secondary={`${page.category || t('SYSCOMMON.page')} • ${page.followers_count || 0} ${t('SYSCOMMON.followers')}`}
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary">{t('SYSCOMMON.noPages')}</Typography>
      )}
    </>
  )
}

export default ConnectPages
