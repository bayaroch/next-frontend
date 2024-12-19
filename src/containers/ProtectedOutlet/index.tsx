import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import _ from 'lodash'
import { useAuth } from '@global/AuthContext'
import { ROLE } from '@services/auth.services'
import InitAppLoader from '@components/InitApp/InitAppLoader'

interface ProtectedOutletProps {
  redirectPath?: string
  allowedRole: ROLE
}

const ProtectedOutlet: React.FC<ProtectedOutletProps> = ({
  redirectPath,
  allowedRole,
}) => {
  const { init } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [isAllowed, setIsAllowed] = useState(false)

  const role = _.get(init, 'user_info.role', undefined)
  const isConfirmedSeller = _.get(init, 'user_info.is_confirmed_seller', false)

  useEffect(() => {
    if (role) {
      switch (allowedRole) {
        case ROLE.USER:
          setIsAllowed(true)
          break
        case ROLE.ADMIN:
          setIsAllowed(role === ROLE.ADMIN)
          break
        case ROLE.SELLER:
          setIsAllowed(role === ROLE.SELLER && isConfirmedSeller)
          break
        default:
          setIsAllowed(false)
      }
    }

    setIsLoading(false)
  }, [allowedRole, role, isConfirmedSeller])

  if (isLoading) {
    return <InitAppLoader /> // Or any loading indicator
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath ? redirectPath : '/403'} replace />
  }

  return <Outlet />
}

export default ProtectedOutlet
