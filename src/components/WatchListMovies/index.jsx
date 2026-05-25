import {Link} from 'react-router-dom'

const WatchListMovies = ({movie}) => {
const mediaType = movie.number_of_seasons || movie.first_air_date ? 'tv' : 'movie';

  return (
    <Link to={`/${mediaType}Details/${movie.id}`}> 
    <li className="listItems rounded-xl w-42 pb-3 transition-transform duration-200 ease-in-out hover:scale-110">
      <img src={movie.poster} alt={movie.id} className="w-42 h-48 rounded-t-lg mb-2"/>
      <h1 className="pl-2 pb-1 text-sm text-white font-semibold">{movie.title}</h1>
      <p className="pl-2 text-xs text-indigo-100 ">{movie.date}</p>
    </li>
    </Link>
  )
}

export default WatchListMovies
