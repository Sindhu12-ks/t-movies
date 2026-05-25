import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaBookmark } from "react-icons/fa";
import StarRating from "../../components/Rating"
import Cast from "../../components/Cast"
import Trailer from "../../components/Trailer"
import SimilarMovies from "../../components/SimilarMovies"
import { useWatchListContext } from "../../context/WatchListContext"
import { fetchTvDetails } from '../../services/api';
import {ThreeDots} from 'react-loader-spinner'

     
const  TvDetails = () => {
   const [tvData,setTvData]=useState(null)
    const [loading,setLoading]=useState(false)
    const [isExpanded, setIsExpanded] = useState(false);
   const { addToWatchList,removeFromWatchList,isAdded}=useWatchListContext()

   let params=useParams()
  const getMovie=async () => {
    setLoading(true)
    try{
    const moviedetails=await fetchTvDetails(params.id)
    setTvData(moviedetails)
    }catch(e){
      console.log(e)
    }finally{
      setLoading(false)
    }
    
  }
  useEffect(()=>{
    if(params.id){
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getMovie() 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params.id])
    const added=isAdded(parseInt(tvData?.id))
    function onAddwatchList(e){
      e.preventDefault()
      e.stopPropagation()
      if(added){
        removeFromWatchList(parseInt(tvData?.id))
      }else{
        addToWatchList(tvData)
      }
    }
 console.log(tvData)
    const rating= tvData?.voteAvg || 0; 
    const cast = tvData?.credits?.cast || [];
    const videos = tvData?.videos?.results || [];
    const officialTrailer = videos.find(
       (vid) => vid.type === "Trailer" && vid.name.includes("Official Trailer")
    ) || videos.find((vid) => vid.type === "Trailer");
    const currentSeason = tvData?.number_of_seasons || 1;
    const relatedTvshows = tvData?.similarShowss?.results || [];
    return(
      <>
      {loading && (
       <div className="flex justify-center items-center" data-testid="loader">
         <ThreeDots color="#0b69ff" height="50" width="50" ariaLabel='three-dots-loading'/>
       </div>  
      )}
       {!loading && (
        <>
       <div className="relative bg-no-repeat bg-center bg-cover w-full min-h-full text-white"
            style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.1) 100%), url(${tvData?.background})` }}>
          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            <img src={tvData?.poster}  alt={tvData?.title} className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 max-w-full h-auto rounded-lg shadow-2xl" />
    
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold pb-2">{tvData?.title}</h1>
            <p className="pr-5 text-gray-500">{tvData?.date}</p>
            <p className="pr-5 text-beige-500 font-bold">{currentSeason >1 ? "Seasons":"Season"}: <span className="font-bold text-blue-400">{currentSeason}</span></p>
                
          
                <ul className="flex gap-2 pt-2 pb-1 mb-1.5">
                  {tvData?.genres?.map((genre)=>(
                    <li key={genre.id} className="genreItem pl-1.5 pt-0.5 pb-0.5 pr-1.5">{genre.name}</li>
                  ))}
                </ul>
                <StarRating rating={rating}/>
                 
                 
                 
      
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className={`leading-relaxed opacity-90 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
               {tvData?.overview}</p>
              {tvData?.overview && tvData?.overview.length > 30 && (
                <button type="button" 
                   className="mt-2 text-sm font-semibold text-yellow-500 hover:underline block"
                   onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? 'Read less' : 'Read more...'}
                </button>)}
            </div>
            <div className='flex'>
               <Trailer trailerKey={officialTrailer?.key}/>
              <button type="button" className='genreItem1' onClick={onAddwatchList}>
                <div className="flex items-center justify-center">
                   <FaBookmark className='mr-1'/> 
                   {added? "Remove":"Add to Watchlist"}
                </div>
               </button>
            </div>
          </div>
          </div>
        </div>
        <div className='p-5'> 
        <Cast cast={cast}/>
        </div>
      <div className='p-5'> 
         <SimilarMovies similar={relatedTvshows} type="tv"/>
      </div>
       </>   
    )}
      </>
    )
}

export default  TvDetails
