import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Components/Login/Login.jsx'
import Registration from './Components/Registration/Registration.jsx'
import './index.css'
import Home from './Components/Home/Home.jsx'
import Main from './Components/RootPage/Main.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Authprovider from './provider/Authprovider.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      {
        path:'/login',
        element:<Login></Login>,
      },{
        path:'/register',
        element:<Registration></Registration>
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Authprovider>
  
  <RouterProvider router={router} />

 </Authprovider>
)
