import { ROLE_PERMISSION } from '@constants/user.constants'

export function hasPermission(permissions, module) {
  const allowedPermission = permissions?.find(
    (item) => item.attributes.name === module
  )

  const isAllowedRead = !!(
    (allowedPermission &&
      allowedPermission.attributes.type === ROLE_PERMISSION.READ) ||
    (allowedPermission &&
      allowedPermission.attributes.type === ROLE_PERMISSION.WRITE) ||
    (allowedPermission &&
      allowedPermission.attributes.type === ROLE_PERMISSION.ADMIN)
  )
  const isAllowedWrite = !!(
    (allowedPermission &&
      allowedPermission.attributes.type === ROLE_PERMISSION.WRITE) ||
    (allowedPermission &&
      allowedPermission.attributes.type === ROLE_PERMISSION.ADMIN)
  )

  const isAdmin = !!(
    allowedPermission &&
    allowedPermission.attributes.type === ROLE_PERMISSION.ADMIN
  )

  return {
    isAllowedRead,
    isAllowedWrite,
    isAdmin,
  }
}

export function generateRandomString(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return randomString
}

export function generateRandomNumber(length) {
  const characters = '0123456789'
  let randomNumber = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomNumber += characters.charAt(randomIndex)
  }

  return randomNumber
}

export function generateRandomCharacter(length) {
  const characters = '!@#$%^&*()-+'
  let randomCharacter = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomCharacter += characters.charAt(randomIndex)
  }

  return randomCharacter
}
