

export interface CartItem {
  id: number
  name: string
  price: number
  qty: number
  category?: string
}

export type Coupon = 'VIP10' | null

export interface Bill {
  count: number
  subtotal: number
  discount: number
  shipping: number
  payable: number
}

