import { createContext, useContext, useEffect, useState } from "react";

const WatchListContext=createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchListContext=()=>{
    const context=useContext(WatchListContext)
    if(!context){
        throw new Error('useWatchListContext must be used within a WatchListProvider')

    }
    return context
} 
export const WatchListProvider=({children})=>{
    const [watchList,setWatchList]=useState(()=>{
        try{
        const storedwatchList=localStorage.getItem('watchList')
        return storedwatchList?JSON.parse(storedwatchList):[]
        }catch(error){
            console.log(error)
            return []
        }
    })

    useEffect(()=>{
        localStorage.setItem('watchList',JSON.stringify(watchList))
    },[watchList])

    const addToWatchList=(movie)=>{
        setWatchList((prev)=>{
            if(prev.some((item)=>item.id===movie.id)) return prev;
            return [...prev,movie]})
    }
    const removeFromWatchList=(movieId)=>{
        setWatchList(prev=> prev.filter(movie=>movie.id!==movieId))
    }
    const isAdded=(movieId)=>{
        return watchList.some(movie=>movie.id===movieId)
    }
    const value={
        watchList,addToWatchList,removeFromWatchList,isAdded
    }
    return <WatchListContext.Provider value={value}>{children}</WatchListContext.Provider>
}