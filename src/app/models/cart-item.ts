export interface CartItem {
  name: string;
  quantity: number;
  totalPrice: number;
    id: number
    title: string
    image: string
    price: number
    short_desc: string
    category: string
    description: string
    images: string[]
    items: CartItem[]
    totalCount: number
}
