document.getElementById("main_form").addEventListener("submit", (event) => {
    event.preventDefault(); // stop form from submitting

    const body = new FormData(document.getElementById("main_form")); // construct payload
    console.log(body);
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 2. Open connection */
    xhttp.open("POST", "/postNews", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    /* 3. Send request */
    xhttp.send(body);
});