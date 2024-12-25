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
}

export type ProductionListResponse = any
export type CreateProductParams = {
  name: string
  price: number
  token_amount: number
  duration_days: number
  description: string
  additional_settings?: any
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
  amount: number
  invoice_id?: string
}

export type CheckResponse = {
  is_success: boolean
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
    const { data } = await api.get<CheckResponse>(
      `${URI.TRANSACTION}/${params.transaction_id}/check-payment-status`,
      {
        params: { amount: params.amount, invoice_id: params.invoice_id },
      }
    )
    return data
  },
}
