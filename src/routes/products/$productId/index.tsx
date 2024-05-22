import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId/')({
  component: ProductDetailPage
})

function ProductDetailPage() {
  const { productId } = Route.useParams()

  return <div>ProductDetailPage: {productId}</div>
}

export default ProductDetailPage
