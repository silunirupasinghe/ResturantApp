import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import UpdateResturant from './pages/UpdateResturant.jsx';
import AddResturant from './pages/AddResturant.jsx';
import ViewResturant from './pages/ViewResturan.jsx';

const router= createBrowserRouter([
  {
    path:"/",
    element: <Home/>,

  },
  {
    path:"/update/:id",
    element: <UpdateResturant/>,

  },
  
  {
    path:"/add/",
    element: <AddResturant/>,

  },
  {
    path:"/get/:id",
    element: <ViewResturant/>,

  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      

     <RouterProvider router={router}/>
  </React.StrictMode>,
)
