function register(event){
    event.preventDefault();
    let username=document.getElementById('username').value.trim();
    let email=document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    if (username=='' || email=='' || password==''){
        alert('please fill the details')
        return
    }
    let movieusers =JSON.parse(localStorage.getItem('movieusers')) || []
    let existuser = movieusers.find((user)=>user.email==email)
    if (existuser){
        alert('User already exists')
        return;
    }
    let newuser={
        name:username,
        email:email,
        password:password
    }
    movieusers.push(newuser)
    localStorage.setItem('movieusers',JSON.stringify(movieusers));
    alert('Registration successful')
    window.location.href='login.html'
    
}
