import { RxHamburgerMenu } from "react-icons/rx"
import {Link,NavLink,useNavigate} from "react-router-dom"
import { FaBookmark } from "react-icons/fa";
import { useState} from "react"
import MovieSearch from "../../pages/Search";
import {AiOutlineSearch} from "react-icons/ai"

const Header=()=>{
        const [isOpen,setOpen]=useState(false)
        const [query, setQuery] = useState('');
        const navigate=useNavigate()
        const toggle=()=>{
                setOpen(!isOpen)
        }
        const handleNavClick=(path)=>{
                navigate(path)
                setOpen(false)
        }  

       const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) { 
         navigate(`/search?q=${encodeURIComponent(query)}`);
         setQuery('');  
    }
  };

  return(
      <nav className="bg-amber-100 bg-cover w-full z-50"> 
        <div className="flex items-center justify-between p-2.5">
          <div className="pr-2">
            <Link to="/"> 
                <img src="https://res.cloudinary.com/di56syjhq/image/upload/v1776672398/tmovie_qwmd5j.svg" alt="logo" className="w-7 md:w-12"/>
             </Link>
          </div>
        <form onSubmit={handleSearchSubmit} className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          className='w-60 outline-none'
        />
        <button type="submit" className="search-button">
          <AiOutlineSearch size='16'/>
        </button>
      </form>

                        <div className="hidden sm:block">
                        <ul className="flex items-center list-none">
                                <NavLink to="/popular" className={({ isActive }) => 
          `transition-colors duration-200 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-black'}`
        }>
                                <li className="px-4">Popular</li>
                                </NavLink>
                                 <NavLink to="/top-rated" className={({ isActive }) => 
          `transition-colors duration-200 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-black'}`
        }>
                                 <li className="px-4">Top Rated</li>
                                 </NavLink>
                                 <NavLink to="/upcoming" className={({ isActive }) => 
          `transition-colors duration-200 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-black'}`
        }>
                                 <li className="px-4">Upcoming</li>
                                </NavLink>
                                <NavLink to="/now-playing" className={({ isActive }) => 
          `transition-colors duration-200 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-black'}`
        }>
                                 <li className="px-4">Now Playing</li>
                                </NavLink>
                                <NavLink to='/watchlist' className={({ isActive }) => 
          `transition-colors duration-200 ${isActive ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-black'}`
        }><li className="px-4"><FaBookmark className='mr-1'/></li></NavLink>
                                 
                        </ul>
                        </div>
                        <button onClick={toggle} className="px-4 text-3xl block sm:hidden"><RxHamburgerMenu size="16"/></button>
                </div>
                {isOpen && (
                <div className="sm:hidden">
                        <ul className="flex flex-col bg-gray-100 items-center list-none">
                                <li className="p-1 cursor-pointer" onClick={()=>handleNavClick('/popular')}>Popular</li>
                                <li className="p-1 cursor-pointer" onClick={()=>handleNavClick('/top-rated')}>Top Rated</li>
                                <li className="p-1 cursor-pointer" onClick={()=>handleNavClick('/upcoming')}>Upcoming</li>
                                <li className="p-1 cursor-pointer" onClick={()=>handleNavClick('/now-playing')}>Now Playing</li>
                                <li className="p-1 cursor-pointer" onClick={()=>handleNavClick('/watchlist')}>WatchList</li>
                        </ul>
                </div>
        )}
                </nav>
        )
}
export default Header