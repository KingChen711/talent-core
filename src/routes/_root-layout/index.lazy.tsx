import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_root-layout/')({
  component: Index
})

function Index() {
  return (
    <div className='p-2'>
      <h3 className='text-gradient font-bold'>Welcome Home!</h3>
    </div>
  )
}
