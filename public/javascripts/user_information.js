function getUserInfo() {
    let xhttp = new XMLHttpRequest();
    let id = getCookie('userId');
    if (!id) {
        window.location.replace('http://localhost:8080/index');
        return;
    }
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && this.status == 200) {
            let infos = JSON.parse(xhttp.responseText);
            document.getElementById("mail").innerText=infos[0].email;
            document.getElementById("phone").innerText=infos[0].phone;
            document.getElementById("fullname").innerText=infos[0].full_name;
            document.getElementById("username").innerText=infos[0].user_name;
            document.getElementById("role").innerText=infos[0].role;
        }
    };


    xhttp.open("POST",'/userInformation', true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({id:id}));
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

