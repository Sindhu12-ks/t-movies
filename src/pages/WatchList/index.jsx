import { useWatchListContext } from '../../context/WatchListContext';
import WatchListMovies from '../../components/WatchListMovies';
import { useNavigate } from 'react-router-dom';


function WatchList() {
    const { watchList } = useWatchListContext();
    const navigate=useNavigate()
     const navigateHome=()=>{
    navigate('/')
  }
        if (watchList.length === 0) {
            return (
            <div className="flex justify-center items-center flex-col p-10">
                <h2 className="pl-2 pb-1 text-sm text-black font-semibold text-center">No Favourite Movies Yet!!</h2>
                <p className="pl-2 pb-1 text-sm text-yellow-300 font-semibold text-center">Start adding movies to your favourites and they will appear here...</p>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png" alt="add" className='w-62 mt-7 h-50'/>
                <button type="button" className="bg-amber-200 w-26 border border-black rounded p-0.5 mt-6 hover:bg-amber-300" onClick={navigateHome}>Home</button>
            </div>
            );
        }
        return (
            <div className="flex justify-center items-center flex-col">
            <h2 className="pl-2 pb-1 text-sm text-black font-semibold p-5">You Added these Movies to Watch List</h2>
            <ul className='flex flex-row justify-center flex-wrap pt-4 gap-3'>
                {watchList.map((movie) => (
                <WatchListMovies movie={movie} key={movie.id} />
                ))}
            </ul>
            </div>
        );
} 


export default WatchList;