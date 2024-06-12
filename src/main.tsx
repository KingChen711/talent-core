import ReactDOM from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { dark } from '@clerk/themes'
import { ThemeProvider, useTheme } from './contexts/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './contexts/auth-provider'

const queryClient = new QueryClient()

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// Create a new router instance
const router = createRouter({
  routeTree
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

function App() {
  const { actualTheme } = useTheme()

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: actualTheme === 'dark' ? dark : undefined,
        elements: {
          formButtonPrimary: 'bg-gradient text-gradient-foreground !shadow-none'
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}
