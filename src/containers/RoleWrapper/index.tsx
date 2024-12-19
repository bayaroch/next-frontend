import React from 'react'
import { ROLE } from '@services/auth.services'
import { useAuth } from 'global/AuthContext'
import _ from 'lodash'

export type RenderParams = {
  isDisabled: boolean
  isAdmin: boolean
  isSeller: boolean
  isConfirmedSeller: boolean
}

interface RoleWrapperProps {
  allowedRoles: ROLE[]
  behavior?: 'hidden' | 'disabled'
  render: (params: RenderParams) => React.ReactElement
}

const RoleWrapper: React.FC<RoleWrapperProps> = ({
  allowedRoles,
  behavior = 'hidden',
  render,
}) => {
  const { init } = useAuth()

  const userRole = _.get(init, 'user_info.role') as ROLE
  const isConfirmedSeller = _.get(init, 'user_info.is_confirmed_seller', false)

  const isAllowed = allowedRoles.includes(userRole)
  const isAdmin = userRole === ROLE.ADMIN
  const isSeller = userRole === ROLE.SELLER

  const renderContent = () => {
    if (isAllowed) {
      return render({
        isDisabled: behavior === 'disabled' && !isAllowed,
        isAdmin,
        isSeller,
        isConfirmedSeller,
      })
    }

    if (behavior === 'disabled') {
      return render({
        isDisabled: true,
        isAdmin,
        isSeller,
        isConfirmedSeller,
      })
    }

    return null
  }

  return renderContent()
}

export default RoleWrapper
