function login(event){

    // stop refresh
    event.preventDefault();

    // get values
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // get users
    let movieusers = JSON.parse(localStorage.getItem("movieusers")) || [];

    // check user
    let validUser = movieusers.find(user => 
        user.email === email && user.password === password
    );

    if(validUser){

        // save login status
        localStorage.setItem("loginUser", JSON.stringify(validUser));

        alert("Login successful");

        // redirect
        window.location.href = "index.html";

    }else{
        alert("Invalid email or password");
    }

}