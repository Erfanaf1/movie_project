import React, { useEffect, useState } from "react";
import searchIcon from "../../../assets/icons/search.svg";
import { searchMovies } from "../../../services/api";
import SearchResultCard from "./SearchResultCard";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const navigate = useNavigate();

  // Debounced search: waits 400ms after user stops typing, then calls API
  useEffect(() => {
    const timer = setTimeout(async () => {
      // Don't search for empty or single-character queries
      if (query.length < 2) {
        setResult([]);
        return;
      }

      const data = await searchMovies(query);

      // API sometimes returns duplicate titles with different IDs — deduplicate by title
      const uniqueData = [
        ...new Map(data.data.map((m) => [m.title, m])).values(),
      ];
      console.log(uniqueData);

      setResult(uniqueData);
    }, 400);

    // Cleanup: cancel previous timer when query changes (prevents multiple API calls)
    return () => clearTimeout(timer);
  }, [query]);

  // Navigate to search page on Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`search/?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div>
      {/* Desktop search (hidden on mobile) */}
      <div className="max-md:hidden relative">
        {/* Search trigger button */}
        <div
          onClick={() => setIsOpen(true)}
          className="flex justify-center items-center bg-[#234230] box-content w-10 h-10 rounded-md border border-transparent transition cursor-pointer hover:shadow-[0_0_15px_rgba(74,222,128,0.3),0_0_30px_rgba(74,222,128,0.1)] hover:border-primary-300"
        >
          <img src={searchIcon} alt="" className="w-6 h-6" />
        </div>

        {/* Search dropdown */}
        {isOpen && (
          <>
            {/* Invisible overlay — clicking outside closes the search */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
            />

            <form onSubmit={handleSubmit}>
              {/* Search input box */}
              <div className="absolute top-full flex flex-col justify-center mt-2 left-0 z-20 bg-[#234230] border border-primary-800 rounded-lg p-4 w-90 animate-[fadeIn_0.2s_ease-out] shadow-[4px_4px_15px_rgba(74,222,128,0.3),-4px_4px_15px_rgba(74,222,128,0.3)]">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="جستجو..."
                  autoFocus
                  className="w-full bg-surface-925 text-white px-3 py-2 rounded-md outline-none border border-surface-700 focus:border-primary-400"
                />

                {/* TODO: Render SearchResultCard here when result.length > 0 */}
                <div className="flex flex-col gap-6 pt-4">
                  {result.slice(0, 5).map((movie) => (
                    <SearchResultCard key={movie.id} movie={movie} />
                  ))}
                </div>

                {/* see all button */}
                {result.length > 0 ? (
                  <Link
                    to={`/search?q=${query}`}
                    className="text-center bg-primary-300 text-surface-925 mt-4 py-2 rounded-md border-2 border-transparent transition-all hover:text-primary-300 hover:border-primary-300 hover:bg-[#234230] hover:shadow-[0_0_10px_rgba(74,222,128,0.3),0_0_20px_rgba(74,222,128,0.1)]"
                  >
                    مشاهده همه نتایج
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </form>
          </>
        )}
      </div>

      {/* Mobile search bar (hidden on desktop) */}
      <div className="md:hidden flex items-center pl-2 gap-2 bg-[#306345] rounded-md">
        <input
          type="text"
          placeholder="جستجو..."
          className="bg-[#234230] px-2 h-10 rounded-tr-md rounded-br-md outline-none"
        />
        <img src={searchIcon} alt="" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default SearchBar;
