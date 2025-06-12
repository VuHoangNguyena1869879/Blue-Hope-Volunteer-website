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

function fetchEventNames() {
    const idx = getCookie('userId');

    // Fetch event names
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var names = JSON.parse(xhttp.responseText);
            var infoList = document.getElementById("info_list");

            infoList.innerHTML = '';

            if (names.length === 0) {
                var noEventMessage = document.createElement('p');
                noEventMessage.textContent = "You haven't joined an event!";
                infoList.appendChild(noEventMessage);
            } else {
                for (let i = 0; i < names.length; i++) {
                    var listItem = document.createElement('li');
                    listItem.textContent = `${i + 1}. ${names[i].event_name}`;
                    infoList.appendChild(listItem);
                }
            }
        }
    };

    xhttp.open("POST", "/myEvents?idx=" + encodeURIComponent(idx), true);
    xhttp.send();
}