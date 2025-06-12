function getContentForPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idx = urlParams.get('idx');

    if (!idx) {
        console.error("Index (idx) parameter is missing in the URL.");
        return;
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var content = JSON.parse(xhttp.response);
                var content_title = document.getElementById("content_title");
                var content_body = document.getElementById("content_body");
                var content_img = document.getElementById("content_img");

                content_title.textContent = content[0].news_title;
                content_body.innerHTML = "";
                var content_paragraph = document.createElement("p");
                content_paragraph.innerText = content[0].news_body;
                content_body.appendChild(content_paragraph);
                content_img.src = content[0].news_im_path;
                content_img.alt = content[0].news_title;
            } else {
                console.error("Failed to fetch content. Status:", this.status);
            }
        }
    };

    xhttp.open("GET", "/newsPage?idx=" + encodeURIComponent(idx), true);
    xhttp.send();
}
