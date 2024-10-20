import { useContext } from 'react'
import ConfirmContext from './ConfirmContext'

const useConfirm = () => {
  const confirm = useContext(ConfirmContext)
  if (!confirm) throw new Error('within ConfirmProvider')
  return confirm
}

export default useConfirm
