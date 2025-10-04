'use client'

import { ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: string
  regular_price: string
  sale_price?: string
  images: Array<{
    src: string
    alt: string
  }>
  short_description: string
  stock_status: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOnSale = product.sale_price && product.sale_price !== product.regular_price
  const displayPrice = isOnSale ? product.sale_price : product.regular_price
  const originalPrice = isOnSale ? product.regular_price : null

  return (
    <div className="card group hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative mb-4">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Sem imagem
            </div>
          )}
        </div>
        
        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Oferta
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.short_description.replace(/<[^>]*>/g, '')}
        </p>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-primary-600">
            R$ {displayPrice}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              R$ {originalPrice}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="text-sm">
          <span className={`inline-block px-2 py-1 rounded text-xs ${
            product.stock_status === 'instock' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.stock_status === 'instock' ? 'Em estoque' : 'Fora de estoque'}
          </span>
        </div>
        
        {/* Add to Cart Button */}
        <button 
          className="w-full btn btn-primary flex items-center justify-center space-x-2"
          disabled={product.stock_status !== 'instock'}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Adicionar ao carrinho</span>
        </button>
      </div>
    </div>
  )
}
