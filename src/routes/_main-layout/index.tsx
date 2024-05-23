import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main-layout/')({
  component: () => HomePage
})

function HomePage() {
  return <div>HomePage</div>
}

export default HomePage
