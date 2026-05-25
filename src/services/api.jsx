import axios from "axios"
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const apiKey = import.meta.env.VITE_API_KEY;


const responseObj=each=>({
        id:each.id,
        title:each.title,
        poster: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
        date:each.release_date.split('-')[0],
        voteAvg:each.vote_average,
        genres:each.genre_ids
})

const movieObj=each=>({
        id:each.id,
        title:each.title,
        poster: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
        date:each.release_date.split("-")[0],
        overview:each.overview,
        background:`https://image.tmdb.org/t/p/w500${each.backdrop_path}`,
        runtime:each.runtime,
        genres:each.genres,
        credits:each.credits,
        voteAvg:each.vote_average,
        videos:each.videos,
        similarMovies:each.similar
    })
const tvObj=each=>({
        id:each.id,
        title:each.name,
        poster: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
        date: (each.first_air_date || "").split("-")[0] || "Unknown",
        overview:each.overview,
        background:`https://image.tmdb.org/t/p/w500${each.backdrop_path}`,
        genres:each.genres,
        credits:each.credits,
        voteAvg:each.vote_average,
        createdBy:each.created_by,
        videos:each.videos,
        similarShowss:each.similar,
        number_of_seasons:each.number_of_seasons
    })

const responsesTv=item=>({
    id:item.id,
    name:item.name,
    poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
    date:item.first_air_date.split('-')[0]
})
const BASE_URL = 'https://api.themoviedb.org/3';
const options={
        method:"GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }
export const  fetchNowPlaying = async (page) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/now_playing?page=${page}`,options);
            const data = await response.json();
            const newMovies = data?.results?.map(each => responseObj(each));
            return newMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    };
export const  fetchUpComing = async (page) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/upcoming?page=${page}`,options);
            const data = await response.json();
            const newMovies = data?.results?.map(each => responseObj(each));
            return newMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    };
export const  fetchPopular = async (page) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/popular?page=${page}`,options);
            const data = await response.json();
            const newMovies = data?.results?.map(each => responseObj(each));
            return newMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    };
export const  fetchTopRated = async (page) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/top_rated?page=${page}`,options);
            const data = await response.json();
            const newMovies = data?.results?.map(each => responseObj(each));
            return newMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    };
export const  fetchTvShows = async (page) => {
        try {
            const response = await fetch(`${BASE_URL}/tv/popular?page=${page}`,options);
            const data = await response.json();
             const newMovies = data?.results?.map(item => responsesTv(item));
            return newMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    };
export const  fetchMovieDetails = async (id) => {
        try {
             const response = await fetch(`${BASE_URL}/movie/${id}?append_to_response=credits,videos,similar`,options);
            const responseJson = await response.json();
             const newMovies =movieObj(responseJson);
            return newMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    }; 
export const  fetchTvDetails = async (id) => {
        try {
             const response = await fetch(`${BASE_URL}/tv/${id}?append_to_response=credits,videos,similar`,options);
            const responseJson = await response.json();
             const newMovies =tvObj(responseJson);
            return newMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    }; 
export const  fetchGenre = async (id,page) => {
        try {
             const response = await fetch(`${BASE_URL}/discover/movie?with_genres=${id}&page=${page}`,options);
             const data=await response.json()
             
            const newMovies = data?.results?.map(item => responseObj(item));
            return newMovies
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    }; 
export const  fetchsearch = async (query) => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
            params: {
            api_key: `${apiKey}`,
            query: query,
          },
        });
         
             const newMovies=response?.data?.results || []
              const filteredResults = newMovies.filter(
  (item) => item.media_type === "movie" || item.media_type === "tv" ) 
             return filteredResults
        } catch (error) {
            console.error("Error fetching movies:", error);
            return []
        }
    }; 
        