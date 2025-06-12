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

function getContentForPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get('idx');
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var content = JSON.parse(xhttp.response);
            var content_title = document.getElementById("content_title");
            var content_description = document.getElementById("content_description");
            var content_activities = document.getElementById("content_activities");
            var content_prerequisite = document.getElementById("content_prerequisite");
            var content_img = document.getElementById("content_img");
            var content_time = document.getElementById("content_time");
            var content_location = document.getElementById("content_location");
            var content_type = document.getElementById("content_type");
            var content_status = document.getElementById("content_status");

            content_title.textContent = content[0].event_name;
            content_description.innerText = content[0].event_description;
            content_activities.innerText = content[0].event_activities;
            content_prerequisite.innerText = content[0].event_prerequisite;
            content_img.src = content[0].event_im_path;
            content_img.alt = content[0].event_name;
            content_time.textContent = content[0].event_date + ' ' + content[0].event_time;
            content_location.textContent = content[0].event_location;
            content_type.textContent = content[0].event_type;
            content_status.textContent = (content[0].event_done ? "Done" : "Not Done");

            if (content[0].event_done) {
                document.getElementById("mark_done_btn").style.display = "none";
            }
        }
    };
    /* 2. Open connection */
    xhttp.open("GET", "/eventPage?idx=" + encodeURIComponent(idx), true);
    /* 3. Send request */
    xhttp.send();
}

function checkRSVP() {
    const userRole = getCookie("userRole");
    if (userRole === "manager" || userRole === "admin") {
        return;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get('idx');
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const joined = xhttp.response;

            if (joined === 'joined') {
                document.getElementById('join_event_btn').style.display = 'none';
                document.getElementById('unjoin_event_btn').style.display = 'block';
            } else {
                document.getElementById('join_event_btn').style.display = 'block';
                document.getElementById('unjoin_event_btn').style.display = 'none';
            }
        }
    };
    /* 2. Open connection */
    xhttp.open("GET", "/checkRSVP?idx=" + encodeURIComponent(idx), true);
    /* 3. Send request */
    xhttp.send();
}

function showRsvp() {
    // Redirect to the events RSVP page
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get('idx');
    window.location.href = "eventsRSVP.html?idx=" + encodeURIComponent(idx);
}

function rmPost() {
    const confirmation = confirm('Are you sure to remove this event?');
    if (!confirmation) {
        return;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get('idx');
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.href = "events.html";
        }
    };
    /* 2. Open connection */
    xhttp.open("POST", "/rmEvent", true);
    xhttp.setRequestHeader('Content-type', 'application/JSON');
    /* 3. Send request */
    xhttp.send(JSON.stringify({ id: idx }));
}

function markDone() {
    const confirmation = confirm('Are you sure to mark this event as done?');
    if (!confirmation) {
        return;
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get('idx');
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            location.reload();
        }
    };
    /* 2. Open connection */
    xhttp.open("POST", "/markDone", true);
    xhttp.setRequestHeader('Content-type', 'application/JSON');
    /* 3. Send request */
    xhttp.send(JSON.stringify({ id: idx }));
}