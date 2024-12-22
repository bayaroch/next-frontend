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

export type UpdateProductParams = {
  id: string
  payload: CreateProductParams
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
    const { data } = await api.patch<any>(
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
  updateProduct: async (input: any): Promise<any> => {
    const { data } = await api.put<any>(`${URI.PRODUCT}`, input)
    return data
  },
  // delete endpoint
  deleteProduct: async (id: string): Promise<any> => {
    const { data } = await api.delete<any>(`${URI.PRODUCT}/${id}`)
    return data
  },
}
