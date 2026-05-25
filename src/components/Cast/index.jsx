const Cast=({cast})=>{
    const topCast = cast?.slice(0, 15)||[];
    if (topCast.length===0) return null
    return (<>
      <h1 className='pl-3 font-bold text-cyan-800 text-2xl pb-3'>Cast</h1>
    <ul className="flex flex-row mb-4 gap-3 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">

    {topCast.map((actor) => (
      <li key={actor.id} className="shrink-0 listItems rounded-2xl  snap-start w-36">
        <img 
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} 
          alt={actor.name} 
          className="w-36 h-38  rounded-t-lg mb-1"
        />
        <p className="pl-2  text-sm text-white">{actor.character.replace(/\s?\(\s?voice\s?\)/gi, "")}</p>
        <p className="pl-2 pb-1 actor">{actor.name}</p>
      </li>
))}
  </ul></>
);


}
export default Cast
 
