let cl = console.log;

const API_KEY = "72df7708b0060d308acb2be6b8dc5db4";

// DOM

const movieDetails = document.getElementById("movieDetails");

// Get movie ID from URL

const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");

cl("Movie ID:", movieId);

// Fetch movie details
function getMovieDetails() {
  const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  fetch(API_URL)
    .then((response) => response.json())
    .then((movie) => {
      cl("Movie Details:", movie);

      displayMovieDetails(movie);

      // get trailer !
      getMovieTrailer(movie.id);

      // Get similar movies
      getSimilarMovies(movie.id);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Display movie details
function displayMovieDetails(movie) {
  const movieDetailsSection = document.getElementById("movieDetailsSection");

  movieDetailsSection.style.backgroundImage = `
    linear-gradient(
        rgba(0, 0, 0, 0.85),
        rgba(0, 0, 0, 0.95)
    ),
    url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")
`;

  movieDetails.innerHTML = `

        <div class="col-md-4">

            <img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                alt="${movie.title}"
                class="img-fluid rounded"
            >

        </div>


        <div class="col-md-8">

            <h1>
                ${movie.title}
            </h1>

            <p class="rating">
                ⭐ ${movie.vote_average.toFixed(1)}
            </p>


            <p>
                <strong>Release Date:</strong>
                ${movie.release_date}
            </p>


            <p>
                <strong>Runtime:</strong>
                ${movie.runtime} minutes
            </p>


            <div class="genres">

                ${movie.genres
                  .map(
                    (genre) => `
                    <span class="genre-badge">
                        ${genre.name}
                    </span>
                `,
                  )
                  .join("")}

            </div>


            <h3>Overview:</h3>

            <p>
                ${movie.overview}
            </p>

        </div>

    `;
}

function getMovieTrailer(movieId) {
  const Video_Api_Url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`;

  fetch(Video_Api_Url)
    .then((res) => res.json())
    .then((data) => {
      cl("Movie Videos:", data.results);

      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );

      if (trailer) {
        displayTrailer(trailer.key);
      } else {
        cl("No YouTube Trailer Found");
      }
    })
    .catch((err) => {
      cl("Trailer Error:", err);
    });
}

function displayTrailer(videoKey) {
  movieDetails.innerHTML += `

        <div class="col-12 mt-5">

            <h2 class="mb-4">
                🎬 Official Trailer
            </h2>

            <div class="ratio ratio-16x9">

                <iframe
                    src="https://www.youtube.com/embed/${videoKey}"
                    title="Movie Trailer"
                    allowfullscreen>
                </iframe>

            </div>

        </div>

    `;
}

//  similar movie

function getSimilarMovies(movieId) {
  const SIMILAR_API_URL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`;

  fetch(SIMILAR_API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Similar Movies:", data.results);

      displaySimilarMovies(data.results);
    })
    .catch((error) => {
      console.log("Similar Movies Error:", error);
    });
}

function displaySimilarMovies(movieList) {
  const similarMovies = document.getElementById("similarMovies");

  similarMovies.innerHTML = "";

  movieList.slice(0, 4).forEach((movie) => {
    const movieCard = document.createElement("div");

    movieCard.className = "col-12 col-md-4 col-lg-3";

    movieCard.innerHTML = `

            <div class="movie-card h-100">

                <img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    alt="${movie.title}" class="img-fluid rounded main-poster"
                >

                <div class="movie-info">

                    <h3>
                        ${movie.title}
                    </h3>

                    <p class="rating">
                        ⭐ ${movie.vote_average.toFixed(1)}
                    </p>

                    <p class="click-details">
    Click for more details →
</p>
                </div>

            </div>

        `;

    movieCard.addEventListener("click", () => {
      window.location.href = `movieDetails.html?id=${movie.id}`;
    });

    similarMovies.appendChild(movieCard);
  });
}

// Start
getMovieDetails();
