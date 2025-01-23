import React from 'react'
import { useQuery } from 'react-query'
import { getProfileService } from '@services/user.services'
import { Card, CardContent, Typography } from '@mui/material'
import ProfileLayout from '@containers/ProfileLayout'

const AccountTransactions: React.FC = () => {
  const { data } = useQuery('profile', getProfileService, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return (
    data && (
      <ProfileLayout profile={data}>
        <Card sx={{ boxShadow: 2, p: 0 }}>
          <CardContent sx={{ p: 1, pb: 2 }}>
            <Typography variant="h6">Unavailable</Typography>
          </CardContent>
        </Card>
      </ProfileLayout>
    )
  )
}

export default AccountTransactions
