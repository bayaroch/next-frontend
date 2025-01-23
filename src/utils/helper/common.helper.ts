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

import { Promo } from '@services/payment.services'
import { currency } from '@constants/common.constants'
import { formatValue } from 'react-currency-input-field'

interface PriceDetails {
  subtotal: number
  discountAmount: number
  total: number
  subtotalText?: string
  discountAmountText?: string
  totalText?: string
}

interface CalculatePriceParams {
  basePrice: number
  quantity: number
  promo: Promo | null
}

export const calculatePrice = ({
  basePrice = 0,
  quantity = 1,
  promo,
}: CalculatePriceParams): PriceDetails => {
  // Ensure quantity is a number
  const parsedQuantity = Number(quantity)

  // Handle invalid inputs
  if (
    !Number.isFinite(basePrice) ||
    !Number.isFinite(parsedQuantity) ||
    parsedQuantity <= 0
  ) {
    return {
      subtotal: 0,
      discountAmount: 0,
      total: 0,
      subtotalText: '',
      discountAmountText: '',
      totalText: '',
    }
  }

  // Calculate subtotal
  const subtotal = basePrice * parsedQuantity

  // Calculate discount if promo exists and is valid
  let discountAmount = 0
  if (promo && Number.isFinite(promo.discount_value)) {
    if (promo.discount_type === 'fixed') {
      // For fixed discounts, apply the discount to each item
      discountAmount = Math.min(promo.discount_value * parsedQuantity, subtotal)
    } else {
      // For percentage discounts, apply to the subtotal
      discountAmount = (subtotal * promo.discount_value) / 100
    }
  }

  // Ensure discount doesn't exceed subtotal
  discountAmount = Math.min(discountAmount, subtotal)

  // Calculate final total
  const total = Math.max(0, subtotal - discountAmount)

  // Helper function to format currency
  const formatCurrency = (value: number) =>
    `${value.toLocaleString()} ${currency}`.trim()

  // Prepare return object
  const result = {
    subtotal,
    discountAmount,
    total,
    subtotalText: formatCurrency(subtotal),
    discountAmountText:
      discountAmount > 0 ? `- ${formatCurrency(discountAmount)}` : '',
    totalText: formatCurrency(total),
  }

  return result
}

export const formatDiscount = (type: 'fixed' | 'percentage', value: number) => {
  if (type === 'fixed') {
    return `${value.toLocaleString()} ${currency}`
  }
  return `${value}%`
}

// make this helper
export const formatPrice = (price: number) => {
  return formatValue({
    value: price.toString(),
    groupSeparator: ',',
    decimalSeparator: '.',
    suffix: currency,
  })
}
