'use client'

import { useProducts } from '@/hooks/useProducts'
import ProductCard from './ProductCard'
import Loading from './Loading'

export default function ProductGrid() {
  const { products, isLoading, error } = useProducts()

  if (isLoading) return <Loading />
  if (error) return <div className="text-red-600">Erro ao carregar produtos: {error}</div>
  if (!products?.length) return <div className="text-gray-600">Nenhum produto encontrado</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
