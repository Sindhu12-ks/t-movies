import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchNowPlaying, fetchPopular, fetchTopRated, fetchTvShows, fetchUpComing } from "../../services/api"
import Genre from "../../components/Genre"

 const Home=()=>{
    const [popular,setPopular]=useState([])
    const [topRated,setTopRated]=useState([])
    const [upcoming,setUpcoming]=useState([])
    const [nowPlaying,setNowPlaying]=useState([])
    const [tvShows,setTvshows]=useState([])

    const getPopular=async ()=>{
        const popularMovies=await fetchPopular(1)
        setPopular(popularMovies)
    }
    const getToprated=async ()=>{
        const topRatedMovies=await fetchTopRated(1)
        setTopRated(topRatedMovies)
    }
    const getUpcoming=async()=>{
        const upcomingMovies=await fetchUpComing(1)
        setUpcoming(upcomingMovies)
    }
    const getnowPlaying=async()=>{
        const nowPlayingMovies=await fetchNowPlaying(1)
        setNowPlaying(nowPlayingMovies)
    }
    const getTvShows=async ()=>{
        const tvShows=await fetchTvShows(1)
        setTvshows(tvShows)
    }
    useEffect(() => {
         // eslint-disable-next-line react-hooks/set-state-in-effect
         getPopular(),
         getToprated(),
         getUpcoming(),
         getnowPlaying(),
         getTvShows()
    },[]);

    return(
        <>
        <div className="pl-4 pr-4">
             <h1 className="text-blue-900 font-bold pb-4 pt-4 text-xl">Popular</h1>
            <ul className="flex flex-row mb-4 gap-2 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">{popular.map((each) => (
                <Link to={`/movieDetails/${each.id}`} key={each.id} >
                <li className="shrink-0 listItems snap-start rounded-2xl  w-42 transition-transform duration-300 ease-in-out hover:scale-110">
                    <img src={each.poster} alt="img" className="w-42 h-46 rounded-t-lg mb-2"/>
                    <h1 className="pl-2 pb-2 text-sm text-white font-semibold">{each.title}</h1>
                </li>
                </Link>
            ))}</ul> 

            <h1 className="text-blue-900 font-bold pb-4 text-xl">Top Rated</h1>
            <ul className="flex flex-row mb-4 gap-2 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">{topRated.map((each) => (
                <Link to={`/movieDetails/${each.id}`} key={each.id} >
                <li className="shrink-0 listItems snap-start rounded-2xl  w-42 transition-transform duration-300 ease-in-out hover:scale-110">
                    <img src={each.poster} alt="img" className="w-42 h-46 rounded-t-lg mb-2"/>
                    <h1 className="pl-2 pb-2 text-sm text-white font-semibold">{each.title}</h1>
                </li>
                </Link>
            ))}</ul>

            <h1 className="text-blue-900 font-bold pb-4 text-xl">Upcoming</h1>
            <ul className="flex flex-row mb-4 gap-2 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">{upcoming.map((each) => (
                <Link to={`/movieDetails/${each.id}`} key={each.id} >
                <li key={each.id} className="shrink-0 listItems rounded-2xl  snap-start w-42 transition-transform duration-300 ease-in-out hover:scale-110">
                    <img src={each.poster} alt="img" className="w-42 h-46  rounded-t-lg mb-2"/>
                    <h1 className="pl-2 pb-2 text-sm text-white font-semibold">{each.title}</h1>
                </li></Link>
            ))}</ul>
                
            <h1 className="text-blue-900 font-bold pb-4 text-xl">Now Playing</h1>
            <ul className="flex flex-row mb-4 gap-2 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">{nowPlaying.map((each) => (
                <Link to={`/movieDetails/${each.id}`} key={each.id} >
                <li key={each.id} className="shrink-0 rounded-2xl  listItems snap-start w-42 transition-transform duration-300 ease-in-out hover:scale-110">
                    <img src={each.poster} alt="img" className="w-42 h-46 rounded-t-lg  mb-2"/>
                    <h1 className="pl-2 pb-2 text-sm text-white font-semibold">{each.title}</h1>
                </li>
                </Link>
            ))}</ul>
            <Genre/>
            <h1 className="text-blue-900 font-bold pb-4 text-xl">TV Shows</h1>
            <ul className="flex flex-row mb-4 gap-2 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">{tvShows?.map((each) => (
                <Link to={`/tvDetails/${each.id}`} key={each.id} >
                <li key={each.id} className="shrink-0 rounded-2xl  listItems snap-start w-42 transition-transform duration-300 ease-in-out hover:scale-110">
                    <img src={each.poster} alt="img" className="w-42 h-46 rounded-t-lg  mb-2"/>
                    <h1 className="pl-2 pb-2 text-sm text-white font-semibold">{each.name}</h1>
                </li>
                </Link>
            ))}</ul>
        </div>
        </>
    )
 }
 export default Home