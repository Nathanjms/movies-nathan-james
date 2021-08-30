import React from "react";
import { Toaster, toast } from "react-hot-toast";

export default function StarRatings({ movieId, movieRating, request }) {
  const starRatings = [5, 4, 3, 2, 1];

  const handleChange = async (starRating) => {
    try {
      await request.put(`/api/movies/rate`, {
        movieId: movieId,
        rating: starRating,
      });
      toast.success("Rating Added Successfully!");
    } catch (error) {
      toast.error("Error sending rating to API");
    }
  };

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "#363636",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#363636",
              color: "#fff",
            },
          },
        }}
      />
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
