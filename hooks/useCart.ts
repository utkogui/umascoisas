'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: string
  quantity: number
  image: string
  stock_status: string
}

interface CartStore {
  items: CartItem[]
  total: number
  itemCount: number
  addItem: (product: any) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }))
        } else {
          set(state => ({
            items: [...state.items, {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.images?.[0]?.src || '',
              stock_status: product.stock_status
            }]
          }))
        }
        
        // Recalcular totais
        get().calculateTotals()
      },

      removeItem: (id) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id)
        }))
        get().calculateTotals()
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
        get().calculateTotals()
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 })
      },

      calculateTotals: () => {
        const items = get().items
        const total = items.reduce((sum, item) => {
          return sum + (parseFloat(item.price) * item.quantity)
        }, 0)
        const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
        
        set({ total, itemCount })
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
