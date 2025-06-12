function showPage(pageNumber, pageCount) {
    for (let i = 1; i <= pageCount; i++) {
        const page = document.getElementById(`page_${i}_interesting_events`);
        const button = document.getElementById(`page_${i}_button`);

        page.style.display = pageNumber === i ? "block" : "none";

        button.classList.toggle("active", pageNumber === i);

        button.style.textDecoration = pageNumber === i ? "underline" : "none";
        button.style.fontWeight = pageNumber === i ? "bold" : "normal";
    }
}

document.getElementById('event_search_form').addEventListener('submit', function (event) {
    event.preventDefault();

    const searchQuery = document.getElementById('event_search_box').value.toLowerCase().trim();
    sessionStorage.setItem('searchQuery', searchQuery);
    const searchResultsContainer = document.getElementById('search_results');

    fetch(`/search-events?query=${encodeURIComponent(searchQuery)}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                const interestingEventsHeader = document.getElementById('interesting_events_header');
                var all_event = document.getElementById('all_event');
                var content_html = "";
                let start_cnt = 0, end_cnt = 0;
                for (let i = 0; i < data.results.length; i++) {
                    if (i % 4 == 0) {
                        start_cnt++;
                        content_html += '<section id="page_' + (Math.floor(i / 4) + 1) + '_interesting_events" class="main_content_section" style="display: none;">';
                    }
                    content_html += '<div class="interesting_event">';
                    content_html += '<div class="interesting_event_container">';
                    content_html += '<div class="interesting_event_image">';
                    content_html += '<a href="eventPage.html?idx=' + encodeURIComponent(data.results[i].event_id) + '">';
                    content_html += '<img src="' + data.results[i].image + '" alt="' + data.results[i].title + '">';
                    content_html += '</a>';
                    content_html += '</div>';
                    content_html += '<div class="interesting_event_description">';
                    content_html += '<a href="eventPage.html?idx=' + encodeURIComponent(data.results[i].event_id) + '">';
                    content_html += '<h2>' + data.results[i].title + '</h2>';
                    content_html += '</a>';
                    content_html += '<p>' + data.results[i].description + '</p>';
                    content_html += '</div>';
                    content_html += '</div>';
                    content_html += '</div>';
                    if (i % 4 == 3) {
                        end_cnt++;
                        content_html += '</section>';
                    }
                }
                if (start_cnt > end_cnt) {
                    content_html += '</section>';
                }
                let pageCount = Math.floor((data.results.length - 1) / 4) + 1;

                content_html += '<div id="pagination_buttons">';
                for (let i = 1; i <= pageCount; i++) {
                    content_html += '<button type="button" id="page_' + i + '_button" class="page_button" onclick="showPage(' + i + ',' + pageCount + ')">' + i + '</button>';
                }
                all_event.innerHTML = content_html;
                searchResultsContainer.innerHTML = '<h2>Search results:</h2>';
                interestingEventsHeader.style.display = 'none';
                showPage(1, pageCount);
            } else {
                searchResultsContainer.innerHTML = '<h2>No events found!<br><br>Also some interesting events below...</h2>';
                hideInterestingEvents();
            }
        });
});

function showInterestingEvents() {
    const searchResultsContainer = document.getElementById('search_results');
    const interestingEventsSections = document.querySelectorAll('.main_content_section[id^="page_"]');
    const interestingEventsHeader = document.getElementById('interesting_events_header');

    interestingEventsSections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById('pagination_buttons').style.display = 'none';

    interestingEventsHeader.style.display = 'none';

    searchResultsContainer.style.display = 'block';
}

function hideInterestingEvents() {
    const interestingEventsSections = document.querySelectorAll('.main_content_section[id^="page_"]');
    const interestingEventsHeader = document.getElementById('interesting_events_header');

    interestingEventsSections.forEach((section, index) => {
        if (index === 0) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    document.getElementById('pagination_buttons').style.display = 'block';

    interestingEventsHeader.style.display = 'none';
}

function getAllContent() {
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var contents = JSON.parse(xhttp.response);
            var all_event = document.getElementById('all_event');
            var latest_event = document.getElementsByClassName('latest_event')[0];
            var content_html = "";
            let start_cnt = 0, end_cnt = 0;
            console.log(contents);
            for (let i = 1; i < contents.length; i++) {
                if (i % 4 == 1) {
                    start_cnt++;
                    content_html += '<section id="page_' + (Math.floor(i / 4) + 1) + '_interesting_events" class="main_content_section" style="display: none;">';
                }
                content_html += '<div class="interesting_event">';
                content_html += '<div class="interesting_event_container">';
                content_html += '<div class="interesting_event_image">';
                content_html += '<a href="eventPage.html?idx=' + encodeURIComponent(contents[i].event_id) + '">';
                content_html += '<img src="' + contents[i].event_im_path + '" alt="' + contents[i].event_name + '">';
                content_html += '</a>';
                content_html += '</div>';
                content_html += '<div class="interesting_event_description">';
                content_html += '<a href="eventPage.html?idx=' + encodeURIComponent(contents[i].event_id) + '">';
                content_html += '<h2>' + contents[i].event_name + '</h2>';
                content_html += '</a>';
                content_html += '<p>' + contents[i].event_description + '</p>';
                content_html += '</div>';
                content_html += '</div>';
                content_html += '</div>';
                if (i % 4 == 0) {
                    end_cnt++;
                    content_html += '</section>';
                }
            }
            if (start_cnt > end_cnt) {
                content_html += '</section>';
            }
            let pageCount = Math.floor((contents.length - 2) / 4) + 1;
            content_html += '<div id="pagination_buttons">';
            for (let i = 1; i <= pageCount; i++) {
                content_html += '<button type="button" id="page_' + i + '_button" class="page_button" onclick="showPage(' + i + ',' + pageCount + ')">' + i + '</button>';
            }
            all_event.innerHTML = content_html;

            showPage(1, pageCount);

            var latest_event_html = "";
            latest_event_html += '<h1>Latest Event</h1>\n';
            latest_event_html += '<div class="event_info_container">\n';
            latest_event_html += '<div class="event_info_image">\n';
            latest_event_html += '<a href="eventPage.html?idx=' + encodeURIComponent(contents[0].event_id) + '">\n';
            latest_event_html += '<img src="' + contents[0].event_im_path + '" alt="' + contents[0].event_name + '" id="milestone_img">\n';
            latest_event_html += '</a>\n';
            latest_event_html += '</div>\n';
            latest_event_html += '<div class="event_description">\n';
            latest_event_html += '<a href="eventPage.html?idx=' + encodeURIComponent(contents[0].event_id) + '">\n';
            latest_event_html += '<h1>' + contents[0].event_name + '</h1>\n';
            latest_event_html += '</a>\n';
            latest_event_html += '<p>' + contents[0].event_description + '</p>';
            latest_event_html += '</div>\n';
            latest_event_html += '</div>';
            latest_event.innerHTML = latest_event_html;
        }
    };
    /* 2. Open connection */
    xhttp.open("GET", "/eventContent", true);
    /* 3. Send request */
    xhttp.send();
}

document.addEventListener('DOMContentLoaded', function () {
    checkUserRole();
});

function checkUserRole() {
    const userRole = getCookie("userRole");

    if (userRole === "manager" || userRole === "admin") {
        document.getElementById("addEventButton").style.display = "block";
    } else {
        document.getElementById("addEventButton").style.display = "none";
    }
}

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