import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => AboutPage
})

function AboutPage() {
  return <div>AboutPage</div>
}

export default AboutPage
