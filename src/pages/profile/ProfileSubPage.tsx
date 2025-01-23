import React from 'react'
import { useQuery } from 'react-query'
import { getProfileService } from '@services/user.services'
import { Card, CardContent } from '@mui/material'
import ProfileLayout from '@containers/ProfileLayout'
import Purchase from '@containers/Checkout/Purchase'

const ProfileSubPage: React.FC = () => {
  const { data } = useQuery('profile', getProfileService, {
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return (
    data && (
      <ProfileLayout profile={data}>
        <Card sx={{ boxShadow: 2, p: 0 }}>
          <CardContent sx={{}}>
            <Purchase />
          </CardContent>
        </Card>
      </ProfileLayout>
    )
  )
}

export default ProfileSubPage
