import { createContext } from 'react'
import { ConfirmOptions } from './types'

export default createContext<(options: ConfirmOptions) => Promise<void> | any>(
  () => null
)
