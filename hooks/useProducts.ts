import { useState, useEffect } from 'react'
import { wooApi, WooProduct } from '@/lib/woocommerce'

export function useProducts() {
  const [products, setProducts] = useState<WooProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await wooApi.getProducts({
          per_page: 20,
          status: 'publish',
          stock_status: 'instock'
        })
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos')
        console.error('Erro ao buscar produtos:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading, error }
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<WooProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await wooApi.getProduct(id)
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produto')
        console.error('Erro ao buscar produto:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  return { product, isLoading, error }
}
