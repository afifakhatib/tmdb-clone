let cl = console.log;

// api data
// const movies = [

//     {
//         title: "Inception",
//         rating: 8.8,
//         image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
//     },

//     {
//         title: "Interstellar",
//         rating: 8.7,
//         image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
//     },

//     {
//         title: "The Dark Knight",
//         rating: 9.0,
//         image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
//     },

//     {
//         title: "Avengers: Endgame",
//         rating: 8.3,
//         image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
//     }

// ];

// ===============================
// TMDB API
// ===============================

const Api_Key = "72df7708b0060d308acb2be6b8dc5db4";

const Api_url = `https://api.themoviedb.org/3/movie/popular?api_key=${Api_Key}`;

const Search_Api_url = "https://api.themoviedb.org/3/search/movie";

// ===============================
// DOM
// ===============================

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// ===============================
// Fetch Movies
// ===============================

function getMovies() {
  fetch(Api_url)
    .then((response) => response.json())
    .then((data) => {
      cl(data);
      displayMovies(data.results);
    })
    .catch((error) => {
      cl("ERROR:", error);
    });
}

// ===============================
// Display Movies
// ===============================

function displayMovies(movieList) {
  movieContainer.innerHTML = "";

  movieList.forEach((movie) => {
    const movieCard = document.createElement("div");

    movieCard.className = "mb-4 col-12 col-md-4 col-lg-3";

    movieCard.innerHTML = `
                

                     <div class="movie-card h-100">

        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="mt-4">

        <div class="movie-info">
            <h3>${movie.title}</h3>

            <p class="rating">
                ⭐ ${movie.vote_average.toFixed(1)}
            </p>

            <p class="click-details">
    Click for more details →
</p>
        </div>

    </div>


        `;

    //for getting id of single movie

    movieCard.addEventListener("click", () => {
      cl(`${movie.id}`);

      window.location.href = `movieDetails.html?id=${movie.id}`;
    });

    movieContainer.appendChild(movieCard);
  });
}

function searchMovies() {
  const query = searchInput.value.trim();

  if (query === "") {
    getMovies();
    return;
  }

  const searchURL = `${Search_Api_url}?api_key=${Api_Key}&query=${encodeURIComponent(query)}`;

  fetch(searchURL)
    .then((response) => response.json())

    .then((data) => {
      cl("Search results:", data.results);

      displayMovies(data.results);
    })

    .catch((error) => {
      cl("Search Error:", error);
    });
}

// displayMovies(movies);
getMovies();

searchBtn.addEventListener("click", searchMovies);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});

// side bar
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

//  <img src="${movie.image}" alt="${movie.title}">
//                     <div class="movie-info">
//                         <h3>${movie.title}</h3>
//                         <p class="rating">
//                             ⭐ ${movie.rating}
//                         </p>
//                     </div>
