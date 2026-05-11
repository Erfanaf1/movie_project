import React from "react";
import imdbImage from "../../../assets/images/imdb.png";
import { Link } from "react-router-dom";

const SearchResultCard = ({ movie }) => {
  console.log(movie.poster);
  return (
    <Link to={'/'}>
      <div className="flex items-start gap-3 rounded-md border border-primary-300 bg-surface-900 cursor-pointer transition-all hover:bg-surface-850 hover:shadow-[0_0_10px_rgba(74,222,128,0.3),0_0_20px_rgba(74,222,128,0.1)]">
        {/* poster */}
        {movie.poster != "http://moviesapi.ir/images/" ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-20 h-30 object-cover rounded-tr-md rounded-tb-md"
          />
        ) : (
          <div className="flex justify-center items-center text-black bg-surface-400 w-20 h-30">
            no poster
          </div>
        )}
        {/* details */}
        <div className="flex flex-col items-center justify-between w-full pt-4 pb-4 h-30 text-white">
          {/* title */}
          <span className="text-center w-full px-1">{movie.title}</span>
          {/* rating & year */}
          <div className="flex justify-between w-full px-4 ">
            <span>{movie.year}</span>
            <span className="flex items-center gap-2 ">
              {movie.imdb_rating}
              <img src={imdbImage} alt="" className="w-8 rounded" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
