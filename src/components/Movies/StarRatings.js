import React from "react";

export default function StarRatings({ movieId, movieRating, request }) {
  const starRatings = [5, 4, 3, 2, 1];

  const handleChange = async (starRating) => {
    try {
      var result = await request.put(`/api/movies/rate`, {
        movieId: movieId,
        rating: starRating,
      });
      console.log(result); //TODO: Remove after testing. If status 201, success toastr.Í
    } catch (error) {
      console.log(error); //TODO: Remove after testing.
    }
  };

  return (
    <div>
      <span>Rating: </span>
      <div className="star-rating">
        {starRatings.map((starRating, index) => {
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
