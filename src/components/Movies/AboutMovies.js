import React from "react";
import { Card } from "react-bootstrap";

export default function AboutMovies() {
  return (
    <div className="row">
      <div className="col-lg-12 pt-3">
        <h3 className="text-center pb-5">About</h3>
      </div>
      <div className="col-lg-12 d-flex justify-content-center">
        <div className="w-100 text-left mt-2 row" id="moviesAboutDiv">
          <Card.Body className="random-movie-card pt-4">
            <div>
              <p>
                What started as a running joke of never being able to decide
                what movie to watch has become an entire section on my website!
              </p>
              <p>
                In the movies section, you can create a watchlist of movies for
                you and your group. Everyone in your group will be able to add
                movies and mark them as seen. Currently, I'm manually creating
                and assigning each group.
              </p>
              <p>
                The first tab, <b>'My Watch List'</b> are the movies you have
                yet to watch - here you can add new movies as we as mark any of
                on the list as 'Seen'. Movies marked as 'Seen' enter into the
                'My Watched Movies' section.
              </p>
              <p>
                In the <b>'My Watched Movies'</b> section, you can see all of
                the movies you have watched. The plan is to add a rating system
                here too, where you can rate each movie from 0 - 5 stars.
              </p>
              <p>
                The <b>'Random Movie Picker'</b> section selects a movie at
                random from the 'My Watch List' tab - taking the horrible
                responsibility of deciding what movie to watch out of your
                hands!
              </p>
              <p>
                I doubt this is the case, but if anyone is genuinely interested
                in having an account to see this functionality in non-demo mode,
                feel free to drop me an email on{" "}
                <a href="mailto:nathan@nathanjms.co.uk">
                  nathan@nathanjms.co.uk
                </a>{" "}
                and I will create a user account and group for you!
              </p>
            </div>
          </Card.Body>
          <Card.Body className="random-movie-card mt-4">
            <h5 className="pb-3">Future Plans</h5>
            <ul>
              <li>
                <strike>Add demo section for people without an account</strike>{" "}
                - Added 23/05/21
              </li>
              <li>
                <strike>Star Rating system for watched movies</strike> - Added
                30/08/21
              </li>
              <li>Allow users to be in more than one group</li>
              <ul>
                <li>Potentially have an individual movie list too</li>
              </ul>
              <li>
                Make demo and regular movie section's JavaScript files match
                closer to follow the DRY convention.
              </li>
              <li>
                <strike>Switch backend to use a Laravel API</strike> - Added 22/08/21
              </li>
              <ul>
                <li>
                  <strike>
                    Including the user's system from Firebase, so the users and
                    the movies are stored in the same place.
                  </strike>
                </li>
              </ul>
              <li>Random Movie Picker - styling improvements</li>
              <ul>
                <li>General styling - maybe use two cards instead of one.</li>
                <li>
                  Pick Movie button to be more dynamic, maybe disappear when
                  choosing, then say 'Choose again?' afterwards.
                </li>
              </ul>
            </ul>
          </Card.Body>
        </div>
      </div>
    </div>
  );
}
