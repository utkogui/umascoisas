import axios from 'axios'

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL || 'http://localhost:8080'
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET

// Configuração do cliente Axios para WooCommerce
const woocommerce = axios.create({
  baseURL: `${WOOCOMMERCE_URL}/wp-json/wc/v3`,
  auth: {
    username: CONSUMER_KEY || '',
    password: CONSUMER_SECRET || ''
  },
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface WooProduct {
  id: number
  name: string
  slug: string
  permalink: string
  date_created: string
  date_modified: string
  type: string
  status: string
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: string | null
  date_on_sale_to: string | null
  price_html: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: string
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  shipping_required: boolean
  shipping_taxable: boolean
  shipping_class: string
  shipping_class_id: number
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  related_ids: number[]
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: Array<{
    id: number
    name: string
    slug: string
  }>
  tags: Array<{
    id: number
    name: string
    slug: string
  }>
  images: Array<{
    id: number
    date_created: string
    date_modified: string
    src: string
    name: string
    alt: string
  }>
  attributes: any[]
  default_attributes: any[]
  variations: number[]
  grouped_products: number[]
  menu_order: number
  meta_data: any[]
}

export interface WooOrder {
  id: number
  parent_id: number
  status: string
  currency: string
  date_created: string
  date_modified: string
  discount_total: string
  discount_tax: string
  shipping_total: string
  shipping_tax: string
  cart_tax: string
  total: string
  total_tax: string
  customer_id: number
  order_key: string
  billing: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
  }
  shipping: {
    first_name: string
    last_name: string
    company: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
  }
  payment_method: string
  payment_method_title: string
  transaction_id: string
  customer_ip_address: string
  customer_user_agent: string
  created_via: string
  customer_note: string
  date_completed: string | null
  date_paid: string | null
  cart_hash: string
  number: string
  meta_data: any[]
  line_items: any[]
  tax_lines: any[]
  shipping_lines: any[]
  fee_lines: any[]
  coupon_lines: any[]
  refunds: any[]
}

// Funções da API
export const wooApi = {
  // Produtos
  getProducts: async (params?: any): Promise<WooProduct[]> => {
    const response = await woocommerce.get('/products', { params })
    return response.data
  },

  getProduct: async (id: number): Promise<WooProduct> => {
    const response = await woocommerce.get(`/products/${id}`)
    return response.data
  },

  // Categorias
  getCategories: async (params?: any) => {
    const response = await woocommerce.get('/products/categories', { params })
    return response.data
  },

  // Pedidos
  getOrders: async (params?: any): Promise<WooOrder[]> => {
    const response = await woocommerce.get('/orders', { params })
    return response.data
  },

  createOrder: async (orderData: any): Promise<WooOrder> => {
    const response = await woocommerce.post('/orders', orderData)
    return response.data
  },

  // Carrinho (simulado via localStorage + API)
  addToCart: async (productId: number, quantity: number = 1) => {
    // Esta função seria implementada com um sistema de carrinho personalizado
    // ou integração com um plugin de carrinho headless
    console.log(`Adicionando produto ${productId} ao carrinho, quantidade: ${quantity}`)
  },
}

export default woocommerce
