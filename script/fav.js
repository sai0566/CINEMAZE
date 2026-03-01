let favorites = [];

document.addEventListener("DOMContentLoaded", function () {

    const favMovies = document.getElementById("favMovies");

    // ✅ Get logged-in user object
    const currentUser = JSON.parse(localStorage.getItem("loginUser"));

    // 🚫 Not logged in
    if (!currentUser) {
        favMovies.innerHTML = `
            <p style="text-align:center; padding:50px;">
                Please login to see your favorites ❤️
            </p>
        `;
        return;
    }

    // ✅ Use user email as unique key
    const userKey = `favorites_${currentUser.email}`;

    favorites = JSON.parse(localStorage.getItem(userKey)) || [];

    // ❌ No favorites
    if (favorites.length === 0) {
        favMovies.innerHTML = `
            <p style="text-align:center; padding:50px;">
                No favorites yet ⭐
            </p>
        `;
        return;
    }

    renderFavorites(userKey);
});

function renderFavorites(userKey) {
    const favMovies = document.getElementById("favMovies");

    favMovies.innerHTML = favorites.map((movie, index) => `
        <div class="movie-card">
            <img 
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                onclick="openMovie(${index})"
            />

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="rating">⭐ ${movie.vote_average || "N/A"}</div>

                <button onclick="removeFromFavorites(${index}, '${userKey}')">
                    Remove from Favorites
                </button>
            </div>
        </div>
    `).join("");
}

function openMovie(index) {
    const movie = favorites[index];
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    window.location.href = "movie.html";
}

function removeFromFavorites(index, userKey) {

    favorites.splice(index, 1);

    localStorage.setItem(userKey, JSON.stringify(favorites));

    // Instead of reload (better UX)
    if (favorites.length === 0) {
        document.getElementById("favMovies").innerHTML = `
            <p style="text-align:center; padding:50px;">
                No favorites yet ⭐
            </p>
        `;
    } else {
        renderFavorites(userKey);
    }
}