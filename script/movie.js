document.addEventListener("DOMContentLoaded", function () {

    const movie = JSON.parse(localStorage.getItem("selectedMovie"));
    const movieDetails = document.getElementById("movieDetails");
    const user = JSON.parse(localStorage.getItem("loginUser"));

    if (!movie) {
        movieDetails.innerHTML = "<p>Movie not found.</p>";
        return;
    }

    // Movie info HTML
    movieDetails.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-info-container">
            <h1>${movie.title}</h1>
            <p><strong>Rating:</strong> ⭐ ${movie.vote_average}</p>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p>${movie.overview}</p>
            ${user ? `<button id="favBtn">Add to Favorites</button>` : `<p>Login to add favorites.</p>`}
            <div class="trailer-container" id="trailer"></div>
        </div>
    `;

    // Fetch movie trailer from TMDB
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=706136ae54be4694bd6d61006c332e35`)
        .then(res => res.json())
        .then(data => {
            const trailerData = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            if (trailerData) {
                document.getElementById("trailer").innerHTML = `
                    <iframe src="https://www.youtube.com/embed/${trailerData.key}" frameborder="0" allowfullscreen></iframe>
                `;
            }
        });

  // Add to favorites
const favBtn = document.getElementById("favBtn");

if (favBtn) {
    favBtn.addEventListener("click", function () {

        const currentUser = JSON.parse(localStorage.getItem("loginUser"));

        if (!currentUser) {
            alert("Please login first!");
            return;
        }

        const userKey = `favorites_${currentUser.email}`;

        let favorites = JSON.parse(localStorage.getItem(userKey)) || [];

        // Avoid duplicates
        const exists = favorites.some(fav =>
            fav.title === movie.title &&
            fav.release_date === movie.release_date
        );

        if (!exists) {
            favorites.push(movie);
            localStorage.setItem(userKey, JSON.stringify(favorites));
            alert("Movie added to favorites ✅");
            } else {
                alert("Movie already in favorites ⚠️");
            }
        });
    }
    });