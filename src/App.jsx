import { RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements,
  Route } from "react-router-dom"
import Home, {loader as HomeLoader} from "./pages/Home"
import Watchlist from "./pages/Watchlist"
import Search from "./pages/Search"
import NotFound from "./pages/NotFound"
import Error from "./pages/Error"
import Layout from "./components/Layout"
import MoviesHome, {loader as MovieGenreLoader} from "./pages/MoviesHome"
import MovieDetailLayout, { loader as MovieDetailLoader } from "./components/MovieDetailLayout"
import MovieDetailRecommended from "./pages/MovieDetailRecommended"
import MovieDetailCasts from "./pages/MovieDetailCasts"
import MovieDetailVideos from "./pages/MovieDetailVideos"
import SeriesHome from "./pages/SeriesHome"


//HOME
//NOW PLAYING
//TRENDING
  //MOVIES -- DROPDOWN MENU FOR GENRES AND INDEX IS DISPLAY TOP RATED/POPULAR MOVIES
    //movieId
      //overview
      //cast
      //videos
    //genre/genreId -- ONCE A GENRE IS CLICKED ON DROP DOWN IT WILL GO HERE
  //SERIES

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" errorElement={<Error />}>

      <Route index element={<Home />} loader={HomeLoader} />
      <Route path="search" element={<Search />} />
      <Route path="watchlist" element={<Watchlist />} />
      <Route path="movies">
        <Route index element={<MoviesHome />} loader={MovieGenreLoader}/>
        <Route path=":movieId" element={<MovieDetailLayout />} loader={MovieDetailLoader}>
          <Route index element={<MovieDetailRecommended />}/>
          <Route path="casts" element={<MovieDetailCasts />}/>
          <Route path="videos" element={<MovieDetailVideos />}/>
        </Route>
      </Route>

      <Route path="series">
        <Route index element={<SeriesHome />}/>
      </Route>
      
      
    </Route>

    <Route path="*" element={<NotFound />} />
  </Route>
))

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}