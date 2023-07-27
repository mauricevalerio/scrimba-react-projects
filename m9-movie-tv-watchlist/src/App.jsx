import { RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  useLocation} from "react-router-dom"
import Home, {loader as HomeLoader} from "./pages/Home"
import Watchlist from "./pages/Watchlist"
import Search from "./pages/Search"
import NotFound from "./pages/NotFound"
import Error from "./pages/Error"
import Layout from "./components/layout/Layout"
import MoviesHome, { loader as MovieGenreListLoader } from "./pages/movies/MoviesHome"
import MovieDetailLayout, { loader as MovieDetailLoader } from "./components/layout/MovieDetailLayout"
import MovieDetailRecommended from "./pages/movies/MovieDetailRecommended"
import MovieDetailCasts from "./pages/movies/MovieDetailCasts"
import MovieDetailVideos from "./pages/movies/MovieDetailVideos"
import TvHome, { loader as TvGenreListLoader } from "./pages/tv/TvHome"
import TvDetailLayout, { loader as TvDetailLoader } from "./components/layout/TvDetailLayout"
import TvDetailRecommended from "./pages/tv/TvDetailRecommended"
import TvDetailCasts from "./pages/tv/TvDetailCasts"
import TvDetailVideos from "./pages/tv/TvDetailVideos"
import { AnimatePresence } from "framer-motion"

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" errorElement={<Error />}>

      <Route index element={<Home />} loader={HomeLoader} />
      <Route path="search" element={<Search />} />
      <Route path="watchlist" element={<Watchlist />} />
      
      <Route path="movies">
        <Route index element={<MoviesHome />} loader={MovieGenreListLoader}/>
        <Route path=":movieId" element={<MovieDetailLayout />} loader={MovieDetailLoader}>
          <Route index element={<MovieDetailRecommended />}/>
          <Route path="casts" element={<MovieDetailCasts />}/>
          <Route path="videos" element={<MovieDetailVideos />}/>
        </Route>
      </Route>

      <Route path="tv">
        <Route index element={<TvHome />} loader={TvGenreListLoader}/>
        <Route path=":tvId" element={<TvDetailLayout />} loader={TvDetailLoader}>
          <Route index element={<TvDetailRecommended />}/>
          <Route path="casts" element={<TvDetailCasts />}/>
          <Route path="videos" element={<TvDetailVideos />}/>
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Route>
))

export default function App() {
  return (
    <div>
      <AnimatePresence>
        <RouterProvider router={router}/>
      </AnimatePresence>
    </div>
  )
}