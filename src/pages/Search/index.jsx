import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {Link} from "react-router-dom"
import { fetchsearch } from '../../services/api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
   
  const query = searchParams.get('q') || '';

 
    const fetchSearchData = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await fetchsearch(query)
        setMovies(response|| []);
      } catch (err) {
        console.error("Search API failed", err);
      } finally {
        setLoading(false);
      }
    };
useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSearchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);  
  const navigateHome=()=>{
    navigate('/')
  }
  return (
    <div className="p-2">
      {loading && <p>Searching database...</p>}
      
      {!loading && (
        <div className="movie-wrapper">
          {movies.length === 0 ? (
            <div className="flex justify-center flex-col items-center">
            <p className='text-xl text-red-500 pl-4 text-center pt-3 pb-1'>No exact matches found. Try another title.</p>
            <button type="button" className="bg-amber-200 w-26 border border-black rounded p-0.5 mt-6 hover:bg-amber-300" onClick={navigateHome}>Home</button>
            </div>
          ) : (
            <>
            <h2 className='text-xl text-black pl-4 text-center pt-3 pb-1'>Search Results for {query.toUpperCase()}</h2>
           <ul className='flex flex-row justify-center flex-wrap pt-3 gap-2'> 
                {movies?.map((item) => {
  const displayName = item.title || item.name || "Unknown Title";

  return (
    <Link to={`/${item.media_type}Details/${item.id}`} key={item.id}>
      <li className="listItems rounded-xl w-42 pb-3 transition-transform duration-200 ease-in-out hover:scale-105">
        <img 
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
          alt={displayName} 
        />
         
        <h1 className="pl-2 pb-1 text-sm text-white font-semibold">
          {displayName}
        </h1>
        <p className="pl-2 text-xs text-indigo-100">
          {item?.release_date?.split('-')[0] || item?.first_air_date?.split('-')[0] || ""}
        </p>
      </li>
    </Link>
  );
})}

                </ul>
                 </>
              )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
