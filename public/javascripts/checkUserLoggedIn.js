function checkLoginStatus() {
    const username = getCookie("username");
    const userRole = getCookie("userRole");
    if (username) {
        document.getElementById("page_header_user").innerHTML = `
                    <div class="page_header_user">
                        <div class= "page_header_username">
                            <a href="#">
                                <i class="fa-solid fa-user"></i>
                                <div id="username_box">
                                    <p id="username_text">${username}</p>
                                </div>
                            </a>
                            <div class="dropdown_container">
                                <div id="dropdown_list">
                                    <ul>
                                        <li><a href="/userInformation">Profile</a></li>
                                        <li><a href="/settings">Settings</a></li>
                                        <li><a href="#" id="logout">Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        document.getElementById('logout').addEventListener('click', function (event) {
            event.preventDefault();
            logoutUser();
        });
        if (userRole === "admin" || userRole === "manager") {
            if (document.getElementById("show_rsvp_btn")) {
                document.getElementById("show_rsvp_btn").style.display = "block";
                document.getElementById("rm_post_btn").style.display = "block";
                document.getElementById("mark_done_btn").style.display = "block";
                document.getElementById("join_event_btn").style.display = "none";
            }
        }
    } else {
        document.getElementById("page_header_user").innerHTML = `
                    <div class="page_header_user">
                        <button type="button" id="login_btn" onclick="location.href='/login'">Log in</button>
                        <button type="button" id="signup_btn" onclick="location.href='/signup'">Sign up</button>
                    </div>
                `;
    }
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function deleteAllCookies() {
    document.cookie.split(";").forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
}

function logoutUser() {
    fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                deleteAllCookies();
                document.getElementById("page_header_user").innerHTML = `
                        <div class="page_header_sign_up">
                            <button type="button" id="login_btn" onclick="location.href='/login'">Log in</button>
                            <button type="button" id="signup_btn" onclick="location.href='/signup'">Sign up</button>
                        </div>
                    `;
                window.location.replace('http://localhost:8080/index');
            } else {
                alert('Logout failed');
            }
        })
        .catch(error => {
            alert('Logout failed');
        });
}