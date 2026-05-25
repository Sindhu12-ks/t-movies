import React, { useState,useMemo,useEffect} from 'react';
import { fetchNowPlaying } from '../../services/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Link} from "react-router-dom"
 
const getButtonStyle = (isActive) => ({
  backgroundColor: isActive ? '#ffcc00' : '#222',
  color: isActive ? '#000' : '#fff',
  border: isActive ? '1px solid #ffcc00' : '1px solid #444',
  padding: '8px 16px',
  borderRadius: '20px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'all 0.2s ease'
});

const NowPlaying = () => {
 
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
    const [activeFilter, setActiveFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

  const loadMovies=async (page)=>{
            const playingMovies=await fetchNowPlaying(page)
            if (!playingMovies || playingMovies.length === 0) {
              setHasMore(false);
              return;
            }

            setItems(prevItems => {
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
         loadMovies(1)
    }, []);

         const handleFilterChange = (filterType) => {
        let nextOrder = 'asc';
        if (activeFilter === filterType) {
          nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
          nextOrder = filterType === 'rating' ? 'desc' : 'asc';
        }
        setActiveFilter(filterType);
        setSortOrder(nextOrder);
      };
     
      const sortedItems = useMemo(() => {
        let result = [...items];
        if (!activeFilter) return result;
    
        if (activeFilter === 'az') {
          result.sort((a, b) => {
            const titleA = a.title || '';
            const titleB = b.title || '';
            return sortOrder === 'asc' 
              ? titleA.localeCompare(titleB) 
              : titleB.localeCompare(titleA);
          });
        } else if (activeFilter === 'rating') {
          result.sort((a, b) => {
            const ratingA = a.voteAvg || 0;
            const ratingB = b.voteAvg || 0;
            return sortOrder === 'desc' ? ratingB - ratingA : ratingA - ratingB;
          });
        }
        return result;
      }, [items, activeFilter, sortOrder]);

    const fetchMoreData = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMovies(nextPage);
};

  return (
      <div> 
        <div className="flex justify-center flex-col items-center" style={{ marginBottom: '24px' }}>
        <p style={{ color: '#000', fontSize:'1.5rem',margin: '0 0 20px 0', textAlign:"center" }}>
          Discover what everyone is watching now !!
        </p>

        {/* Filter Button Group Row */}
        <div className="filter-buttons" style={{ display: 'flex', gap: '12px' }}>
          <button 
            style={getButtonStyle(activeFilter === 'rating')} 
            onClick={() => handleFilterChange('rating')}
          >
            Rating {activeFilter === 'rating' && (sortOrder === 'desc' ? '🔽' : '🔼')}
          </button>

          <button 
            style={getButtonStyle(activeFilter === 'az')} 
            onClick={() => handleFilterChange('az')}
          >
            {activeFilter === 'az' && sortOrder === 'desc' ? 'Z-A 🔽' : 'A-Z 🔼'}
          </button>
        </div>
      </div>
        <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            endMessage={<p>No more results</p>}>
            <ul className='flex flex-row justify-center flex-wrap pt-4 gap-3'> 
              {sortedItems?.map((item) => (
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
  );
};

export default NowPlaying;