import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  AdminPagesService,
  FacebookPage,
  PageConnectService,
} from '@services/page.services'
import PageLoader from '@components/InitApp/PageLoader'
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  ListItemAvatar,
  Stack,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

const ConnectPages = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [connectingPageId, setConnectingPageId] = useState<string | null>(null)

  const { data, isLoading: isLoadingAdminPages } = useQuery({
    queryKey: ['adminPages'],
    queryFn: AdminPagesService,
    enabled: true,
    retry: 2,
  })

  const selectPageMutation = useMutation(PageConnectService, {
    onSuccess: () => {
      queryClient.invalidateQueries('appInit')
      setConnectingPageId(null)
    },
    onError: () => {
      setConnectingPageId(null)
    },
  })

  if (isLoadingAdminPages) {
    return <PageLoader />
  }

  const handleContinue = (id: string) => {
    if (id) {
      setConnectingPageId(id)
      selectPageMutation.mutate({ fb_page_id: id })
    }
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        {t('SYSCOMMON.selectPage')}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ lineHeight: 1.7 }}
      >
        {t('SYSCOMMON.description2')}
      </Typography>

      {data && data.data.length > 0 ? (
        <Stack spacing={3}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data.data.map((page: FacebookPage) => (
              <ListItem
                key={page.id}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                secondaryAction={
                  <LoadingButton
                    onClick={() => handleContinue(page.id)}
                    variant="contained"
                    color="primary"
                    loading={
                      selectPageMutation.isLoading &&
                      connectingPageId === page.id
                    }
                    disabled={
                      selectPageMutation.isLoading &&
                      connectingPageId !== page.id
                    }
                  >
                    {t('SYSCOMMON.connect')}
                  </LoadingButton>
                }
              >
                <ListItemAvatar>
                  <Avatar src={page.cover.source || undefined} alt={page.name}>
                    {page.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={page.name}
                  secondary={`${page.category || t('SYSCOMMON.page')} • ${page.followers_count || 0} ${t('SYSCOMMON.followers')}`}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
      ) : (
        <Typography color="text.secondary">{t('SYSCOMMON.noPages')}</Typography>
      )}
    </>
  )
}

export default ConnectPages
