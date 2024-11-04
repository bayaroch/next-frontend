/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { AppInitResponse } from '@services/auth.services'
import { AdminPagesService, PageConnectService } from '@services/page.services'
import PageLoader from '@components/InitApp/PageLoader'
import _ from 'lodash'

const SetupPage = ({ initData }: { initData?: AppInitResponse }) => {
  const queryClient = useQueryClient()

  const { data: adminPagesData, isLoading: isLoadingAdminPages } = useQuery({
    queryKey: ['adminPages'],
    queryFn: AdminPagesService,
    enabled: !!initData && _.isEmpty(initData.connected_pages),
    retry: 3,
  })

  const selectPageMutation = useMutation(PageConnectService, {
    onSuccess: () => {
      // Invalidate and refetch appInit query
      queryClient.invalidateQueries('appInit')
    },
  })

  if (isLoadingAdminPages) {
    return <PageLoader />
  }

  //   const handlePageSelection = (pageId) => {
  //     selectPageMutation.mutate(pageId)
  //   }

  return (
    <div>
      <h1>Select an Admin Page</h1>
      {adminPagesData && adminPagesData.data.length > 0 ? (
        <ul>
          {adminPagesData.data.map((page: any) => (
            <li key={page.id}>
              <button onClick={() => null}>{page.name}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No admin pages available.</p>
      )}
    </div>
  )
}

export default SetupPage
