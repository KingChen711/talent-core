import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId/edit')({
  component: EditProductPage
})

function EditProductPage() {
  const { productId } = Route.useParams()
  return <div>EditProductPage :{productId}</div>
}

export default EditProductPage
