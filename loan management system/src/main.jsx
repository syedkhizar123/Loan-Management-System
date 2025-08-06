import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider} from 'react-router'
import Home from './Pages/home.jsx'
import About from './Pages/About.jsx'
import NotFound from './Pages/NotFound.jsx'
import LoanRequest from './Pages/loanRequest.jsx'
import RequestForm from './Pages/requestForm.jsx'
import { UserDashboard } from './Pages/userDashboard.jsx'
import { PendingLoans } from './Pages/pending.jsx'
import ApprovedLoans from './Pages/approved.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';




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
    element: <UserDashboard />
  },
  {
    path: "/loanRequest",
    element: <LoanRequest />
  },
  {
    path: "/form",
    element: <RequestForm />
  },
  {
    path: "/pending",
    element: <PendingLoans />
  },
  {
    path: "/approved",
    element: <ApprovedLoans />
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
