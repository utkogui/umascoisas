import { Suspense } from 'react'
import ProductGrid from '@/components/ProductGrid'
import Header from '@/components/Header'
import Loading from '@/components/Loading'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo à nossa loja
          </h1>
          <p className="text-lg text-gray-600">
            Descubra produtos incríveis com a melhor experiência de compra
          </p>
        </div>
        
        <Suspense fallback={<Loading />}>
          <ProductGrid />
        </Suspense>
      </main>
    </div>
  )
}
