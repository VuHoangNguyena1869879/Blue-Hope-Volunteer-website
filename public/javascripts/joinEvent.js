// Function to get a cookie
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function join() {
    const userRole = getCookie("userRole");
    if (userRole === "manager" || userRole === "admin") {
        return;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const event_id = urlParams.get('idx');
    const username = getCookie('username');

    if (!username) {
        // If not logged in, redirect to the login page
        window.location.href = "/login";
        return;
    }
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response_text").innerText = 'You joined this event';
            document.getElementById("response_box").style.display = "block";
        }
    };
    /* 2. Open connection */
    xhttp.open("POST", "/joinEvent", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    /* 3. Send request */
    xhttp.send(JSON.stringify({ event_id: event_id }));
}

function unjoin() {
    const userRole = getCookie("userRole");
    if (userRole === "manager" || userRole === "admin") {
        return;
    }
    const confirmation = confirm('Are you sure to unjoin this event?');
    if (!confirmation) {
        return;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const event_id = urlParams.get('idx');
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("response_text").innerText = 'You unjoined from this event';
            document.getElementById("response_box").style.display = "block";
        }
    };
    /* 2. Open connection */
    xhttp.open("POST", "/unjoinEvent", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    /* 3. Send request */
    xhttp.send(JSON.stringify({ event_id: event_id }));
}