import { ConfirmOptions } from '@components/Confirm/types'

export const defaultConfirmationOptions: ConfirmOptions = {
  confirmationButtonProps: {
    fullWidth: true,
    variant: 'contained',
    size: 'large',
  },
  cancellationButtonProps: {
    variant: 'outlined',
    fullWidth: true,
    size: 'large',
  },
  dialogProps: {
    maxWidth: 'sm',
  },
}

export type LanguageItem = {
  label: string
  shortLabel: string
  id: string
}

export const Languages: LanguageItem[] = [
  {
    label: 'English',
    shortLabel: 'EN',
    id: 'en',
  },
  {
    label: 'Mongolian',
    shortLabel: 'MN',
    id: 'mn',
  },
]

export const BgColorOptions = { saturation: 70, lightness: 75, alpha: 100 }
export const BgColorOptionsLight = {
  saturation: 70,
  lightness: 85,
  alpha: 100,
}

export const BgColorOptionsBackgroundLight = {
  saturation: 70,
  lightness: 85,
  alpha: 50,
}
export const BgColorOptionsDark = { saturation: 70, lightness: 50, alpha: 100 }
export const BgColorOptionsMedium = {
  saturation: 70,
  lightness: 60,
  alpha: 100,
}

export enum Direction {
  desc = 'desc',
  asc = 'asc',
}

export interface FilterParams {
  search: string
  page: number
  orderDir: Direction
  orderBy: string
}

export const currency = '₮'
