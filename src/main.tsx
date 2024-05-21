import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import HomePage from '@/pages/(root)/(home)/page'
import RootLayout from './pages/layout'
import ErrorPage from './pages/error'
import DashboardPage from './pages/(root)/dashboard/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
