import { useState, useEffect } from 'react';
import { useParams,Link, useLocation} from 'react-router-dom';
import { fetchGenre } from '../../services/api';
import {ThreeDots} from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const GenreItem = () => {
  const { id } = useParams();  
  const [items, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  
   
  const genreName = location.state?.genreName || "Genre";

  const fetchGenreMovies=async ()=>{
            const playingMovies=await fetchGenre(id,page)
            if (!playingMovies || playingMovies.length === 0) {
              setHasMore(false);
              return;
            }
          
         setMovies(prevItems => { 
                const combined = [...prevItems, ...playingMovies];
                const uniqueMovies = combined.filter((movie, index, self) =>
                    index === self.findIndex((m) => m.id === movie.id)
                );
                
                return uniqueMovies;
            });
            if (page >= playingMovies.total_pages) {
                setHasMore(false);
            } else {
                setPage(prevPage => prevPage + 1);
            }
    }
    useEffect(() => {
         // eslint-disable-next-line react-hooks/set-state-in-effect
         fetchGenreMovies(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id,page]);
    const fetchMoreData = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGenreMovies(nextPage);
};

  return (
     <div> 
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 8px 0', textAlign:'center' }}>{genreName} Movies Are Here...</h1>

             <InfiniteScroll
                 dataLength={items.length}
                 next={fetchMoreData}
                 hasMore={hasMore}
                 endMessage={<p>No more results</p>}>
                 <ul className='flex flex-row justify-center flex-wrap pt-4 gap-3'> 
                   {items?.map((item) => (
                   <Link to={`/movieDetails/${item.id}`} key={item.id}> 
                       <li className="listItems rounded-xl w-42 pb-3 transition-transform duration-200 ease-in-out hover:scale-110">
                             <img src={item.poster} alt="img" className="w-42 h-48 rounded-t-lg mb-2"/>
                             <h1 className="pl-2 pb-1 text-sm text-white font-semibold">{item.title}</h1>
                             <p className="pl-2 text-xs text-indigo-100 ">{item.date}</p>
                       </li>
                     </Link>
                 ))}
                 </ul>
               </InfiniteScroll>
             </div>
)
};

export default GenreItem;
