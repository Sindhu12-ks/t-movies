import {Link} from "react-router-dom"
const genre=[
{id: 28, name: 'Action', color:'#ef4444'},
{id: 12, name: 'Adventure',color:'#f97316'},
{id: 16, name: 'Animation',color:'#eab308'},
{id: 35, name: 'Comedy',color:'#22c55e'},
{id: 80, name: 'Crime',color:'#64748b'},
{id: 99, name: 'Documentary',color:'#06b6d4'},
{id: 18, name: 'Drama',color:'#e8b84b'},
{id: 10751, name: 'Family',color:'#0891b2'},
{id: 14, name: 'Fantasy',color:'#a855f7'},
{id: 36, name: 'History',color:'#84cc16'},
{id: 27, name: 'Horror',color:'#7c3aed'},
{id: 10402, name: 'Music',color:'#ec4899'},
{id: 9648, name: 'Mystery',color:'#475569'},
{id: 10749, name: 'Romance',color:'#f43f5e'}, 
{id: 878, name: 'Science Fiction',color:'#3b82f6'},
{id: 10770, name: 'TV Movie',color:'#e8b84b'  }, 
{id: 53, name: 'Thriller',color:'#dc2626'},
{id: 10752, name: 'War',color:'#92400e'},
{id: 37, name: 'Western',color:'#d97706'}]

const  Genre =()=> {
    return(
        <>
        <h1 className="text-blue-900 font-bold pb-4 text-xl">Genres</h1>
        <ul
        className="flex flex-row mb-4 gap-2 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
        >{genre.map(each=>(
        <Link to={`/genre/${each.id}`} state={{ genreName: each.name }} key={each.id}>
            <li
            style={{ backgroundColor: each.color }} 
            className="text-white w-45 h-20 flex items-center justify-center rounded p-4 m-2  hover:brightness-90 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 cursor-pointer">
                  
                    {each.name}
            </li>
        </Link>
        ))}</ul>
        </>
    )
}

export default  Genre
