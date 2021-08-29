import React from "react";

export default function StarRatings({ movieId, movieRating }) {
  const starRatings = [5, 4, 3, 2, 1];

  const handleChange = (starRating) => {
    console.log("Rating: " + starRating);
    console.log("Movie ID: " + movieId);
    //TODO: post this data
  };

  return (
    <div>
      <span>Rating: </span>
      <div className="star-rating">
        {starRatings.map((starRating, index) => {
          console.log(movieRating);
          return (
            <React.Fragment key={index}>
              <input
                id={`star-${starRating}-${movieId}`}
                className={`star-${starRating}-${movieId}`}
                type="radio"
                name={`rating-${movieId}`}
                value={`star-${starRating}-${movieId}`}
                defaultChecked={starRating === movieRating}
                onClick={() => handleChange(starRating)}
              ></input>
              <label
                htmlFor={`star-${starRating}-${movieId}`}
                title={`${starRating} stars`}
              >
                <i className="active fa fa-star" aria-hidden="true"></i>
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
