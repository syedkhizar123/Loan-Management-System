import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider} from 'react-router'
import {BrowserRouter , Route , Routes} from 'react-router'
import Home from './Pages/home.jsx'
import About from './Pages/About.jsx'
import NotFound from './Pages/NotFound.jsx'
import LoanRequest from './Pages/loanRequest.jsx'
import RequestForm from './Pages/requestForm.jsx'
// import { AboutItems } from './Pages/About.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  }, 
  {
    path: "*" ,
    element: <NotFound />
  },
  {
    path: "/about/:id",
    element: <About/>
  },
  {
    path: "/App",
    element: <App />
  },
  {
    path: "/loanRequest",
    element: <LoanRequest />
  },
  {
    path: "/form",
    element: <RequestForm />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
