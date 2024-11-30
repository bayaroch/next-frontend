import moment from 'moment'
import { DefaultExtensionType } from 'react-file-icon'

export const stringToColor = (string: string) => {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

export const hashCode = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
  }
  return hash
}

export const generateFileName = (prefix: string, fileExtension: string) => {
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '')
  const fileName = `${prefix}_${timestamp}.${fileExtension}`
  return fileName
}

export const formatHumanDate = (dateString: string) => {
  const date = moment(dateString)
  const now = moment()

  // Calculate the difference in hours between the date and now
  const hoursDiff = now.diff(date, 'hours')

  // If the date is more than 24 hours ago, display it in regular format
  if (hoursDiff >= 24) {
    return date.format('YYYY-MM-DD HH:mm') // Customize the format as needed
  }

  // Otherwise, display it in a human-readable format
  return date.fromNow()
}

export const images = ['gif', 'jpeg', 'jpg', 'svg', 'ico', 'png']

export const getFileExtension = (filename: string): DefaultExtensionType => {
  const ext = /^.+\.([^.]+)$/.exec(filename)
  return ext == null ? 'bin' : (ext[1].toLowerCase() as DefaultExtensionType)
}

export const getFileName = (path: string): string => {
  return path.substring(path.lastIndexOf('/') + 1)
}
