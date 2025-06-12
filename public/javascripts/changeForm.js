// get the type of info that the user want to change
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const info_to_change = urlParams.get('type');

//display a form that changes according to the type of to-be-changed information
function displayForm() {
    const parsed_info = info_to_change.split('_');
    document.getElementById("old_label").innerText = 'Current ' + parsed_info[0] + ':';
    document.getElementById("new_label").innerText = 'New ' + parsed_info[0] + ':';
    if (info_to_change == 'password') {
        document.getElementById('old').setAttribute('type','password');
        document.getElementById('new').setAttribute('type','password');
    }
    let info = "";
    for (let i in parsed_info) {
        info = info + parsed_info[i];
        document.getElementById("old").placeholder = 'Your current ' + info;
        document.getElementById("new").placeholder = 'Your new ' + info;
    }
}

// retrieve information from cookie
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

function changePassword() {
    let old_value = document.getElementById("old").value;
    let new_value= document.getElementById("new").value;
    let xhttp1 = new XMLHttpRequest();
    let id = getCookie('userId');
    if (!id) {
        window.location.replace('http://localhost:8080/index');
        return;
    }

    xhttp1.onreadystatechange = function () {
        if (xhttp1.readyState == 4) {
            if (this.status == 200){
                let confirmation = document.getElementById('response');
                if (!confirmation.classList) {
                    confirmation.className = 'accepted';
                }
                confirmation.classList.add('accepted');
                confirmation.innerText = xhttp1.responseText + 'Returning to profile...';
                setTimeout(function() {
                    window.location.replace('http://localhost:8080/userInformation');}
                , 2000);
            } else if (this.status == 500) {
                let confirmation = document.getElementById('response');
                if (!confirmation.classList) {
                    confirmation.className = 'denied';
                }
                confirmation.classList.add('denied');
                confirmation.innerText = xhttp1.responseText;
                let confirmation_container = document.getElementById('response_container');
                let return_link = document.createElement('a');
                return_link.classList.add('return_link');
                return_link.href = 'http://localhost:8080/userInformation';
                return_link.innerText = 'Return to profile page';
                confirmation_container.appendChild(return_link);
            } else if (this.status == 401) {
                let confirmation = document.getElementById('response');
                if (!confirmation.classList) {
                    confirmation.className = 'denied';
                }
                confirmation.classList.add('denied');
                confirmation.innerText = xhttp1.responseText + '. Please retype or   ';
                let confirmation_container = document.getElementById('response_container');
                let return_link = document.createElement('a');
                return_link.classList.add('return_link');
                return_link.href = 'http://localhost:8080/userInformation';
                return_link.innerText = 'Return to profile page';
                confirmation_container.appendChild(return_link);
            }
        }
    };
    xhttp1.open("POST",'/changePassword', true);
    xhttp1.setRequestHeader("Content-type", "application/json");
    xhttp1.send(JSON.stringify({
        old: old_value,
        new: new_value,
        id: id,
        type: info_to_change
    }));
}

function changeInfo() {
    let old_value = document.getElementById("old").value;
    let new_value= document.getElementById("new").value;
    if ((!old_value) || (!new_value)) return;
    if (info_to_change == 'password') {
        changePassword();
    } else {
        changeOtherInfo();
    }
}
// send the new value of the data to the server for handling
function changeOtherInfo() {
    let old_value = document.getElementById("old").value;
    let new_value= document.getElementById("new").value;
    let xhttp2 = new XMLHttpRequest();
    let id = getCookie('userId');
    if (!id) {
        window.location.replace('http://localhost:8080/index');
        return;
    }

    xhttp2.onreadystatechange = function () {
        if (xhttp2.readyState == 4) {
            if (this.status == 200){
                let confirmation = document.getElementById('response');
                if (!confirmation.classList) {
                    confirmation.className = 'accepted';
                }
                confirmation.classList.add('accepted');
                confirmation.innerText = xhttp2.responseText + '! Returning to profile...';
                setTimeout(function() {
                    window.location.replace('http://localhost:8080/userInformation');}
                , 2000);
            } else if (this.status == 500) {
                let confirmation = document.getElementById('response');
                if (!confirmation.classList) {
                    confirmation.className = 'denied';
                }
                confirmation.classList.add('denied');
                confirmation.innerText = xhttp2.responseText;
                let confirmation_container = document.getElementById('response_container');
                let return_link = document.createElement('a');
                return_link.classList.add('return_link');
                return_link.href = 'http://localhost:8080/userInformation';
                return_link.innerText = 'Return to profile page';
                confirmation_container.appendChild(return_link);
            } else if (this.status == 401) {
                let confirmation = document.getElementById('response');
                if (!confirmation.classList) {
                    confirmation.className = 'denied';
                }
                confirmation.classList.add('denied');
                confirmation.innerText = xhttp2.responseText + '. Please retype or   ';
                let confirmation_container = document.getElementById('response_container');
                let return_link = document.createElement('a');
                return_link.classList.add('return_link');
                return_link.href = 'http://localhost:8080/userInformation';
                return_link.innerText = 'Return to profile page';
                confirmation_container.appendChild(return_link);
            }
        }
    };
    xhttp2.open("POST",'/changeInfo', true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send(JSON.stringify({
        old: old_value,
        new: new_value,
        id: id,
        type: info_to_change
    }));
}
