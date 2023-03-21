import { RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements,
  Route } from "react-router-dom"

import Home, {loader as HomeLoader} from "./pages/Home"
import Watchlist from "./pages/Watchlist"
import Search from "./pages/Search"
import Movies from "./pages/Movies"

import Series from "./pages/Series"
import NotFound from "./pages/NotFound"
import Error from "./pages/Error"
import MovieLayout from "./components/MovieLayout"
import MovieDetailLayout, { loader as MovieDetailLoader } from "./components/MovieDetailLayout"
import MovieDetailOverview from "./pages/MovieDetailOverview"
import MovieDetailCasts from "./pages/MovieDetailCasts"
import MovieDetailVideos from "./pages/MovieDetailVideos"


const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<MovieLayout />}>
    <Route path="/" errorElement={<Error />}>
      <Route index element={<Home />} loader={HomeLoader} />
      <Route path="search" element={<Search />} />
      <Route path="movies" element={<Movies />} />

      <Route path="movies/:id" 
        element={<MovieDetailLayout />}
        loader={MovieDetailLoader}>
        <Route index element={<MovieDetailOverview />}/>
        <Route path="casts" element={<MovieDetailCasts />}/>
        <Route path="videos" element={<MovieDetailVideos />}/>
      </Route>

      <Route path="series" element={<Series />} />
      <Route path="watchlist" element={<Watchlist />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
))

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}