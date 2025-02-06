import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Signin from './auth/signin/index';
import Home from './home'
import Dashboard from './dashboard'
import EditResume from './dashboard/resume/[resumeId]/edit/index';  
import { ClerkProvider } from '@clerk/clerk-react'
import ViewResume from './../my-resume/[resumeId]/view'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // Public route (landing page)
  },
  {
    path: '/auth/signin',
    element: <Signin />, // Public route (sign-in page)
  },
  {
    element: <App />, // Private routes wrapper
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />, // Protected route (dashboard)
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      },
    ],
  },
  {
    path:'/my-resume/:resumeId/view',
    element:<ViewResume/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}/>
    </ClerkProvider>
  </StrictMode>,
)
