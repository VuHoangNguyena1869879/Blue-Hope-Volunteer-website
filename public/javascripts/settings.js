
function displaySettings() {
    const userRole = getCookie('userRole');
    // const userRole = "admin"; // test value
    if (!userRole) {
        // console.log(userRole);
        window.location.replace('http://localhost:8080/index');

    } else if (userRole == "manager") {
        document.getElementById("manage_user").classList.remove("hide");
        return;
    } else if (userRole == 'admin') {
        document.getElementById("manage_user").classList.remove("hide");
        document.getElementById("manage_branches").classList.remove("hide");
        return;
    } else {
        document.getElementById("manage_user").classList.add("hide");
        document.getElementById("manage_branches").classList.add("hide");
        return;
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