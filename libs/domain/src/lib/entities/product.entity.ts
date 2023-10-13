export interface Product {
  id: number
  name: string
  slug: string
  description: string
  isPublic: boolean
  isArchived: boolean
}

export interface ProductVariant {
  id: number
  sku: string
  price: number
  product: Product
  productId: number
}
