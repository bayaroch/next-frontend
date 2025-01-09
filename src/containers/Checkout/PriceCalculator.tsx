import { Promo } from '@services/payment.services'
import React from 'react'

interface PriceCalculatorProps {
  basePrice: number
  quantity: number
  promo: Promo | null
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  basePrice = 0,
  quantity = 1,
  promo,
}) => {
  const calculateTotal = () => {
    if (!Number.isFinite(basePrice) || !Number.isFinite(quantity)) {
      return 0
    }

    let total = basePrice * quantity

    if (promo && Number.isFinite(promo.discount_value)) {
      const discount =
        promo.discount_type === 'fixed'
          ? promo.discount_value
          : (total * promo.discount_value) / 100

      total = Math.max(0, total - discount)
    }

    return Number.isFinite(total) ? total : 0
  }

  return calculateTotal()
}

export default PriceCalculator
