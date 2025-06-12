document.getElementById('signup_form').addEventListener('input', validateAndSubmit);
document.getElementById('signup_form').addEventListener('submit', validateAndSubmit);

const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");
const togglePassword = document.querySelector(".password-toggle-icon i");

let formTouched = {
    password: false,
    confirmPassword: false
};

passwordField.addEventListener('focus', () => formTouched.password = true);
confirmPasswordField.addEventListener('focus', () => formTouched.confirmPassword = true);

function validateAndSubmit(event) {
    if (event.type === 'submit') {
        event.preventDefault();
    }

    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;
    const feedback = document.getElementById('passwordFeedback');
    const submitButton = document.getElementById('submitButton');

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let message = '';
    if (password.length < minLength) {
        message = 'Password must be at least 8 characters long.';
    } else if (!hasUpperCase) {
        message = 'Password must contain at least one uppercase letter.';
    } else if (!hasLowerCase) {
        message = 'Password must contain at least one lowercase letter.';
    } else if (!hasNumbers) {
        message = 'Password must contain at least one number.';
    } else if (!hasSpecialChars) {
        message = 'Password must contain at least one special character.';
    } else if (formTouched.confirmPassword && password !== confirmPassword) {
        message = 'Passwords do not match.';
    } else {
        message = 'Password is strong.';
    }

    if (formTouched.password || formTouched.confirmPassword || event.type === 'submit') {
        feedback.textContent = message;
        feedback.style.color = message === 'Password is strong.' ? 'green' : 'red';
        submitButton.disabled = message !== 'Password is strong.';
    }

    if (event.type === 'submit' && message === 'Password is strong.') {
        let fullname = document.getElementById("fullname").value;
        let email = document.getElementById("email").value;
        let username = document.getElementById("username").value;
        let city = document.getElementById("city").value;
        let phonenumber = document.getElementById("phonenumber").value;

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let response = document.getElementById("response");
                if (this.status == 200 || this.status == 201) {
                    response.innerText = "Sign up successful! Redirecting to log in page..";
                    response.style.color = "green";
                    setTimeout(function () {
                        window.location.href = "/login";
                    }, 2000);
                } else if (this.status == 401) {
                    response.innerText = "Invalid username or password.";
                    response.style.color = "red";
                } else if (this.status == 409) {
                    response.innerText = "Username already exists.";
                    response.style.color = "red";
                } else {
                    response.innerText = "An error occurred, please try again.";
                    response.style.color = "red";
                }
            }
        };
        xhttp.open("POST", "/signup", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            fullname: fullname,
            email: email,
            city: city,
            username: username,
            password: password,
            phonenumber: phonenumber,
            confirmPassword: confirmPassword
        }));

    }
}

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
