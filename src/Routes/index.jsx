import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Popular from '../pages/Popular'
import TopRated from '../pages/TopRated'
import Header from '../components/Header'
import Upcoming from '../pages/Upcoming'
import NowPlaying from '../pages/NowPlaying'
import MovieDetails from '../pages/MovieDetails'
import GenreItem from '../pages/GenreItem'
import WatchList from '../pages/WatchList'
import SearchResults from '../pages/Search';
import TvDetails from '../pages/TvDetails'
 

const RoutePaths=()=> (
  <>
  <Header/>   
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/popular" element={<Popular/>}/>
    <Route path="/top-rated" element={<TopRated/>}/>
    <Route path="/upcoming" element={<Upcoming/>}/>
    <Route path="/now-playing" element={<NowPlaying/>}/>
    <Route path="/genre/:id" element={<GenreItem/>}/>
    <Route path="/watchlist" element={<WatchList/>}/>
    <Route path="/search" element={<SearchResults />} />
    <Route path="/movieDetails/:id" element={<MovieDetails/>}/>
    <Route path="/tvDetails/:id" element={<TvDetails/>}/>
  </Routes>
  </>
)
    
  


export default RoutePaths