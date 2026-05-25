import {Link} from "react-router-dom"
const SimilarMovies=({similar,type})=>{
    const topMovies = similar?.slice(0, 25)||[];
    if (topMovies.length === 0) return null;
 
return(
       <>
         <h1 className='pl-3 font-bold text-cyan-800 text-2xl pb-3'>You May Also Like...</h1>
  <ul className="flex flex-row mb-4 gap-3 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"> 
         
    {topMovies.map((movie) => (
        <Link to={`/${type}Details/${movie.id}`}  key={movie.id}>
            <li className="shrink-0 listItems rounded-2xl  snap-start w-42 transition-transform duration-300 ease-in-out hover:scale-110">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-42 h-46 rounded-t-lg  mb-2" />
                <p className="pl-2 pb-2 text-sm text-white">{movie.title || movie.name}</p>
            </li>
        </Link>))}
         
   </ul>
   </>
)
    

}
export default SimilarMovies