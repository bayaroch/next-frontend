import { URI } from '@constants/uri.constants'
import { api } from './api'

export type Product = {
  product_id: string
  name: string
  price: number
  token_amount: number
  duration_days: number
  description: string
  additional_settings?: any
  is_active: boolean
  identifier: string
}

export type ProductionListResponse = any
export type CreateProductParams = {
  name: string
  price: number
  token_amount: number
  duration_days: number
  description: string
  additional_settings?: any
  is_active: boolean
  identifier: string
}

export type CreateTransactionParams = {
  product_id: string
  payment_method: string
  quantity: number
  promo_code: string
}

export type UpdateProductParams = {
  id: string
  payload: CreateProductParams
}

export interface QpayResponse {
  invoice_id: string
  qr_text: string
  qr_image: string
  urls: {
    name: string
    description: string
    link: string
  }[]
}

export interface DiscountResponse {
  promo_code: string
  discountApplied: boolean
  discountValue: number
  discountType: string
}

export type TransactionResponse = {
  data: {
    transaction_id: string
    qpay?: QpayResponse
    discount?: DiscountResponse
    finalAmount: number
  }
}

export interface CheckTransactionVariables {
  transaction_id: string
}

export interface Transaction {
  user_id: string
  sort_key: string
  transaction_id: string
  product_id: string
  payment_method: string
  qpay_invoice_id: string
  status: string
  quantity: number
  discount_applied: boolean
  promo_code: string
  promo_discount_value: number
  promo_discount_type: string
  final_amount: number
}

export type CheckResponse = {
  is_success: boolean
  transaction?: Transaction
  qpay?: any
}

export type PromoApplyParams = {
  promo_code: string
}
export enum PROMO_TYPE {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export interface Promo {
  promo_code: string
  seller_id: string
  discount_value: number
  discount_type: PROMO_TYPE
  expiry_date: Date
  max_uses: number
  uses_remaining: number
  description: string
}

export type PromoResponse = {
  data: Promo
}

export const ProductService = {
  getProductsByPage: async (
    limit: number = 10,
    lastKey?: string
  ): Promise<ProductionListResponse> => {
    const { data } = await api.get<ProductionListResponse>(`${URI.PRODUCT}`, {
      params: { limit, lastKey },
    })
    return data
  },
  // create endpoint
  createProduct: async (input: CreateProductParams): Promise<any> => {
    const { data } = await api.post<any>(`${URI.PRODUCT}`, input)
    return data
  },
  // update endpoint
  updateProduct: async (input: UpdateProductParams): Promise<any> => {
    const { data } = await api.put<any>(
      `${URI.PRODUCT}/${input.id}`,
      input.payload
    )
    return data
  },
  // delete endpoint
  deleteProduct: async (id: string): Promise<any> => {
    const { data } = await api.delete<any>(`${URI.PRODUCT}/${id}`)
    return data
  },
}

export const PromoService = {
  applyPromo: async (input: PromoApplyParams): Promise<PromoResponse> => {
    const { data } = await api.post<PromoResponse>(`${URI.PROMO}/apply`, input)
    return data
  },
  // create endpoint
}

export const TransactionService = {
  getTransactions: async (
    limit: number = 10,
    lastKey?: string
  ): Promise<any> => {
    const { data } = await api.get<any>(`${URI.PRODUCT}`, {
      params: { limit, lastKey },
    })
    return data
  },
  // create endpoint
  createTransaction: async (
    input: CreateTransactionParams
  ): Promise<TransactionResponse> => {
    const { data } = await api.post<TransactionResponse>(
      `${URI.TRANSACTION}`,
      input
    )
    return data
  },
  // update endpoint
  updateTransaction: async (
    input: CreateTransactionParams
  ): Promise<TransactionResponse> => {
    const { data } = await api.put<TransactionResponse>(
      `${URI.TRANSACTION}`,
      input
    )
    return data
  },
  // delete endpoint
  deleteTransaction: async (id: string): Promise<any> => {
    const { data } = await api.delete<any>(`${URI.TRANSACTION}/${id}`)
    return data
  },
  checkTransactions: async (
    params: CheckTransactionVariables
  ): Promise<CheckResponse> => {
    const { data } = await api.get<CheckResponse>(`user/qpay/check-payment`, {
      params: { transaction_id: params.transaction_id },
    })
    return data
  },
}
