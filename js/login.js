
function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username == "admin" && password == "testpassword") {
        window.location = "menu.html";  //weiterleitung
        return false;
    }
    else {
        alert("wrong username and/or password! Try again or login as guest.");
        return false;
    }

}