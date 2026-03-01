// Wait until DOM loads

const userBox = document.getElementById("userBox");

document.addEventListener("DOMContentLoaded", function () {

    const navbuttons = document.getElementById('navButtons');

    function updateNavbar() {

        let user = JSON.parse(localStorage.getItem('loginUser'));

        if (user) {
            navbuttons.innerHTML = `
                 Welcome, <span>${user.name}</span> 
                <a href="favorites.html" class="btn">Favorites</a>
                <button onclick="logout()" class="register">Logout</button>
            `;
        } else {
            navbuttons.innerHTML = `
                <a href="login.html" class="btn">Login</a>
                <a href="register.html" class="register">Register</a>
            `;
        }
    }

    updateNavbar();

});

// Logout function
function logout() {
    localStorage.removeItem('loginUser');

    // redirect to home page
    window.location.href = "index.html";
}