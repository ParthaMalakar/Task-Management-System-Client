import ReactDOM from 'react-dom/client'
import Login from './Components/Login/Login.jsx'
import Registration from './Components/Registration/Registration.jsx'
import './index.css'
import Home from './Components/Home/Home.jsx'
import Main from './Components/RootPage/Main.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Authprovider from './provider/Authprovider.jsx'
import Dashboard from './Components/RootPage/Dashboard.jsx'
import PrivateRoute from './Components/RootPage/PrivateRoute.jsx'
import Alltasks from './Components/Alltasks/Alltasks.jsx'
import CreateTask from './Components/CreateTask/CreateTask.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
const queryClient = new QueryClient();
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
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'all',
        element: <Alltasks></Alltasks>
      },{
        path:'tasks',
        element:<CreateTask></CreateTask>
      }
    ]
  }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Authprovider>
  <DndProvider backend={HTML5Backend}>
  <QueryClientProvider client={queryClient}>
      
      <div>
        <RouterProvider router={router} />
      </div>
    
  </QueryClientProvider>
  </DndProvider>
 </Authprovider>
)
