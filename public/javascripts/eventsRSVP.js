function getContentForPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get('idx');

    // Fetch event details and RSVP'd users
    fetchEventDetails(idx);
    fetchRSVPUsers(idx);
}

function fetchEventDetails(idx) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var content = JSON.parse(xhttp.responseText);
            var content_title = document.getElementById("event_name");
            content_title.textContent = content[0].event_name;
        }
    };

    xhttp.open("GET", "/eventPage?idx=" + encodeURIComponent(idx), true);
    xhttp.send();
}

function fetchRSVPUsers(idx) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var users = JSON.parse(xhttp.responseText);
            var infoList = document.getElementById("info_list");
            infoList.innerHTML = '';

            if (users.length === 0) {
                var noUserMessage = document.createElement('p');
                noUserMessage.textContent = 'No user has joined the event!';
                infoList.appendChild(noUserMessage);
            } else {
                users.forEach(user => {
                    var listItem = document.createElement('li');

                    var roleDiv = document.createElement('div');
                    roleDiv.classList.add('role');
                    roleDiv.textContent = 'Volunteer';

                    var mailDiv = document.createElement('div');
                    mailDiv.classList.add('mail');
                    var mailLink = document.createElement('a');
                    mailLink.href = `mailto:${user.email}`;
                    mailLink.textContent = user.email;
                    mailDiv.appendChild(mailLink);

                    var phoneDiv = document.createElement('div');
                    phoneDiv.classList.add('phone');
                    phoneDiv.textContent = user.phone;

                    listItem.appendChild(roleDiv);
                    listItem.appendChild(mailDiv);
                    listItem.appendChild(phoneDiv);

                    infoList.appendChild(listItem);
                });
            }
        }
    };

    xhttp.open("GET", "/eventsRSVP?idx=" + encodeURIComponent(idx), true);
    xhttp.send();
}

document.addEventListener('DOMContentLoaded', getContentForPage);