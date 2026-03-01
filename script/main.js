const Api_key = "706136ae54be4694bd6d61006c332e35";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

const user = JSON.parse(localStorage.getItem("loginUser"));
let moviesList = [];

/* =========================
   DOM ELEMENTS
========================= */
const carousel = document.getElementById("carousel");
const moviesSection = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");

/* =========================
   INITIAL LOAD
========================= */

// Always load carousel
fetchTeluguMovies();

// UI based on login
if (user) {
  moviesSection.style.display = "grid";
  if (searchInput) searchInput.disabled = false;
} else {
  moviesSection.style.display = "none";
  if (searchInput) {
    searchInput.disabled = true;
    searchInput.placeholder = "Login to search movies";
  }
}

/* =========================
   FETCH TELUGU MOVIES
========================= */
function fetchTeluguMovies() {
  fetch(
    `${BASE_URL}/discover/movie?api_key=${Api_key}&with_original_language=te&sort_by=popularity.desc`
  )
    .then(res => res.json())
    .then(data => {
      moviesList = data.results || [];

      loadCarousel(moviesList.slice(0, 5));

      if (user) {
        displayMovies(moviesList);
      }
    })
    .catch(err => console.error("API Error:", err));
}

/* =========================
   CAROUSEL
========================= */
function loadCarousel(movies) {
  if (!carousel) return;

  const validMovies = movies.filter(
    m => m.backdrop_path || m.poster_path
  );

  carousel.innerHTML = validMovies
    .map((movie, index) => {
      const img = movie.backdrop_path || movie.poster_path;

      return `
        <div class="slide ${index === 0 ? "active" : ""}">
          <img 
            src="${IMG_BASE}/original${img}" 
            alt="${movie.title}"
            style="object-fit:cover;"
          >
          <div class="hero-text">
            <h1>${movie.title}</h1>
            <p>${movie.overview ? movie.overview.slice(0, 120) + "..." : ""}</p>
          </div>
        </div>
      `;
    })
    .join("");

  startCarousel();
}

function startCarousel() {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;
  setInterval(() => {
    slides.forEach(s => s.classList.remove("active"));
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000);
}

/* =========================
   SEARCH (TELUGU ONLY)
========================= */
if (user && searchInput) {
  let timer = null;

  searchInput.addEventListener("input", () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      const query = searchInput.value.trim();

      if (!query) {
        fetchTeluguMovies();
        return;
      }

      fetch(
        `${BASE_URL}/search/movie?api_key=${Api_key}&query=${encodeURIComponent(
          query
        )}&with_original_language=te`
      )
        .then(res => res.json())
        .then(data => {
          moviesList = data.results || [];
          displayMovies(moviesList);
        })
        .catch(err => console.error(err));
    }, 400);
  });
}

/* =========================
   DISPLAY MOVIES GRID
========================= */
function displayMovies(movies) {
  if (!movies.length) {
    moviesSection.innerHTML =
      "<p style='padding:40px;'>No movies found 😕</p>";
    return;
  }

  moviesSection.innerHTML = movies
    .filter(movie => movie.poster_path)
    .map(
      (movie, index) => `
      <div class="movie-card" onclick="openMovie(${index})">
        <img 
          src="${IMG_BASE}/w500${movie.poster_path}" 
          alt="${movie.title}"
          style="object-fit:cover;"
        >
        <div class="movie-info">
          <h3>${movie.title}</h3>
          <div class="rating">⭐ ${movie.vote_average || "N/A"}</div>
        </div>
      </div>
    `
    )
    .join("");
}

/* =========================
   OPEN MOVIE PAGE
========================= */
function openMovie(index) {
  if (!user) return;

  localStorage.setItem(
    "selectedMovie",
    JSON.stringify(moviesList[index])
  );

  window.location.href = "movie.html";
}