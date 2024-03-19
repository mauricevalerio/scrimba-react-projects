import { RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route } from 'react-router-dom'
import LoginContextProvider from './context/LoginContext'

import Home from './pages/Home'
import About from './pages/About'
import Vans, {loader as VansLoader} from './pages/Vans/Vans'
import VanDetail, {loader as VanDetailLoader } from './pages/Vans/VanDetail'
import Layout from './components/Layout'

import HostLayout from './components/HostLayout'
import Income, {loader as IncomeLoader} from './pages/Host/Income'
import Reviews, {loader as ReviewsLoader} from './pages/Host/Reviews'
import Dashboard, {loader as HostVansLoaderDashboard} from './pages/Host/Dashboard'
import HostVans, {loader as HostVansLoader} from './pages/Host/HostVans'
import HostVanDetail, {loader as HostVanDetailLoader} from './pages/Host/HostVanDetail'
import HostVanDescription from './pages/Host/HostVanDescription'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhoto from './pages/Host/HostVanPhoto'

import NotFound from './pages/NotFound'
import Error from './components/Error'
import Login, {loader as loginLoader ,action as loginAction} from './pages/Login'
import { getVans, getVanById, getHostVans } from './api'

export default function App() {
  const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>

    <Route index element={<Home />} />
    <Route path='about' element={<About />} />

    <Route path='login' element={<Login />}
    loader={loginLoader}
    action={loginAction} 
    />

    <Route path='vans' element={<Vans />} loader={() => VansLoader(getVans)} errorElement={<Error />}/>
    <Route path='vans/:id' element={<VanDetail />} loader={({params}) => VanDetailLoader(params, getVanById)}/>
    
    <Route path='host' element={<HostLayout />}>
      <Route index element={<Dashboard />} loader={({request}) => HostVansLoaderDashboard(getHostVans, request)}/>
      <Route path='income' element={<Income />} loader={IncomeLoader}/>
      <Route path='reviews' element={<Reviews />} loader={ReviewsLoader}/>
      <Route path='vans' element={<HostVans />} loader={({request}) => HostVansLoader(getHostVans, request)}/>
      <Route path='vans/:id' element={<HostVanDetail />} loader={({params, request}) => HostVanDetailLoader(params, request, getVanById) }>
        <Route index element={<HostVanDescription />}/>
        <Route path='pricing' element={<HostVanPricing />}/>
        <Route path='photo' element={<HostVanPhoto />}/>
      </Route>
    </Route>
    
    <Route path='*' element={<NotFound />}/>
  </Route>
))

  return (
    <LoginContextProvider>
      <RouterProvider router={router}/>
    </LoginContextProvider>
  )
}