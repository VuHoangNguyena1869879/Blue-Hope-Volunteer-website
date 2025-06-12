const passwordField = document.getElementById("password");
const togglePassword = document.querySelector(".password-toggle-icon i");

togglePassword.addEventListener("click", function () {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    } else {
        passwordField.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
});

document.getElementById('login_form').addEventListener('submit', function logIn(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            let response = document.getElementById("response");
            if (this.status == 200) {
                response.innerText = "Log in successful! Please wait..";
                response.style.color = "green";
                setTimeout(function () {
                    window.location.href = "/index";
                }, 2000);
            } else if (this.status == 401) {
                response.innerText = "Invalid username or password.";
                response.style.color = "red";
            } else {
                response.innerText = "An error occurred. Please try again.";
                response.style.color = "red";
            }
        }
    };
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        username: username,
        password: password
    }));
});
