import ReactDOM from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { dark } from '@clerk/themes'
import { ThemeProvider } from './contexts/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider, { useAuthContext } from './contexts/auth-provider'

const queryClient = new QueryClient()

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// Create a new router instance
const router = createRouter({
  routeTree,

  context: {
    authData: undefined!
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      baseTheme: dark,
      elements: {
        formButtonPrimary: 'bg-gradient text-gradient-foreground !shadow-none'
      }
    }}
  >
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark'>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ClerkProvider>
)

function App() {
  const authData = useAuthContext()
  return <RouterProvider router={router} context={{ authData }} />
}

export default App
