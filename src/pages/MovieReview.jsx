import { useEffect, useState } from "react";
import { Search, Star, Calendar } from "lucide-react";

const MovieReview = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("avengers");
  const [loading, setLoading] = useState(false);

  const API_KEY = "ea7391da";

  const fetchMovies = async () => {
    try {
      setLoading(true);

      const pages = [1, 2, 3];

      const responses = await Promise.all(
        pages.map((page) =>
          fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`
          ).then((res) => res.json())
        )
      );

      const allMovies = responses.flatMap(
        (response) => response.Search || []
      );

      setMovies(allMovies);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">
      
      {/* Heading */}
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            Movie Review 🎬
          </h1>

          <p className="text-slate-400 text-lg">
            Search and explore your favorite movies
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-3xl mx-auto">
          
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-cyan-400 transition"
            />
          </div>

          <button
            onClick={fetchMovies}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            Search
          </button>
        </div>

        {/* Movies */}
        {loading ? (
          <div className="text-center text-white text-xl">
            Loading Movies...
          </div>
        ) : movies.length > 0 ? (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-300"
              >
                
                {/* Poster */}
                <div className="h-[380px] overflow-hidden">
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  
                  <h2 className="text-white text-lg font-semibold mb-3 line-clamp-1">
                    {movie.Title}
                  </h2>

                  <div className="flex items-center justify-between text-slate-400 text-sm">
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{movie.Year}</span>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span>IMDb</span>
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>

        ) : (
          <div className="text-center text-slate-400 text-xl">
            No movies found
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieReview;