function showPage(pageNumber, type) {
    const pageCount = 5; // Assuming a maximum of 5 pages for both events and news

    for (let i = 1; i <= pageCount; i++) {
        const page = document.getElementById(`page_${i}_${type}`);
        const button = document.getElementById(`page_${i}_${type}_button`);

        if (page) {
            page.style.display = pageNumber === i ? "block" : "none";
        }

        if (button) {
            button.classList.toggle("active", pageNumber === i);
            button.style.textDecoration = pageNumber === i ? "underline" : "none";
            button.style.fontWeight = pageNumber === i ? "bold" : "normal";
        }
    }
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query');
    const username = getCookie("username");
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let branches = JSON.parse(xhttp.response);
            let list = document.getElementById("citydropdown_list");
            let html = "<ul>";
            html += '<li><a href="#" class="city_link" data-city="all">All</a></li>';
            for (let i = 0; i < branches.length; i++) {
                html += '<li><a href="#" class="city_link" data-city="' + branches[i].branch_name + '">' + branches[i].branch_name + '</a></li>';
            }
            html += '</ul>';

            list.innerHTML = html;

            var cityHeader = document.getElementById('page_header_citySelection');
            var cityDropdownList = document.getElementById('citydropdown_list');
            var citySelectorText = document.getElementById('city_selector_text');
            var cityOptions = cityDropdownList.querySelectorAll('li');
            // Initialize city from cookie
            var savedCity = getCookie('selectedCity');
            if (savedCity) {
                citySelectorText.textContent = savedCity;
            }
            cityHeader.addEventListener('click', function (event) {
                event.preventDefault();
                // Toggle the display of the dropdown list
                cityDropdownList.style.display = cityDropdownList.style.display === 'block' ? 'none' : 'block';
            });

            // Handle city selection
            cityOptions.forEach(function (option) {
                option.addEventListener('click', function () {
                    var selectedCity = this.textContent;
                    citySelectorText.textContent = selectedCity;
                    setCookie('selectedCity', selectedCity, 24 * 60 * 60 * 1000);
                    cityDropdownList.style.display = 'none';
                    location.reload();
                });
            });

            // Close the dropdown if the user clicks outside of it
            window.addEventListener('click', function (event) {
                if (!event.target.closest('#page_header_citySelection')) {
                    if (cityDropdownList.style.display === 'block') {
                        cityDropdownList.style.display = 'none';
                    }
                }
            });
        }
    };
    /* 2. Open connection */
    xhttp.open("GET", "/getBranches", true);
    /* 3. Send request */
    xhttp.send();

    if (searchQuery) {
        document.getElementById('search-query-message').innerHTML = `"${searchQuery}"`;

        // Fetch and display events
        fetch(`/search-events?query=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    let content_html = "";
                    for (let i = 0; i < data.results.length; i++) {
                        if (i % 4 == 0) {
                            content_html += `<section id="page_${Math.floor(i / 4) + 1}_events" class="main_content_section" style="display: none;">`;
                        }
                        content_html += '<div class="interesting_event">';
                        content_html += '<div class="interesting_event_container">';
                        content_html += '<div class="interesting_event_image">';
                        content_html += `<a href="eventPage.html?idx=${data.results[i].event_id}">`;
                        content_html += `<img src="${data.results[i].image}" alt="${data.results[i].title}">`;
                        content_html += '</a>';
                        content_html += '</div>';
                        content_html += '<div class="interesting_event_description">';
                        content_html += `<a href="eventPage.html?idx=${data.results[i].event_id}">`;
                        content_html += `<h2>${data.results[i].title}</h2>`;
                        content_html += '</a>';
                        content_html += `<p>${data.results[i].description}</p>`;
                        content_html += '</div>';
                        content_html += '</div>';
                        content_html += '</div>';
                        if (i % 4 == 3) {
                            content_html += '</section>';
                        }
                    }
                    if (data.results.length % 4 !== 0) {
                        content_html += '</section>';
                    }
                    content_html += '<div id="pagination_buttons_events">';
                    for (let i = 1; i <= Math.ceil(data.results.length / 4); i++) {
                        content_html += `<button type="button" id="page_${i}_events_button" class="page_button" onclick="showPage(${i}, 'events')">${i}</button>`;
                    }
                    content_html += '</div>';
                    document.getElementById('search-results-events-container').innerHTML = content_html;
                    showPage(1, 'events');
                } else {
                    document.getElementById('search-results-events-container').innerHTML = '<h2>No events found!</h2>';
                }
            });

        // Fetch and display news
        fetch(`/search-news?query=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    let content_html = "";
                    for (let i = 0; i < data.results.length; i++) {
                        if (i % 4 == 0) {
                            content_html += `<section id="page_${Math.floor(i / 4) + 1}_news" class="main_content_section" style="display: none;">`;
                        }
                        content_html += '<div class="interesting_news">';
                        content_html += '<div class="interesting_news_container">';
                        content_html += '<div class="interesting_news_image">';
                        content_html += `<a href="newsPage.html?idx=${data.results[i].news_id}">`;
                        content_html += `<img src="${data.results[i].image}" alt="${data.results[i].title}">`;
                        content_html += '</a>';
                        content_html += '</div>';
                        content_html += '<div class="interesting_news_description">';
                        content_html += `<a href="newsPage.html?idx=${data.results[i].news_id}">`;
                        content_html += `<h2>${data.results[i].title}</h2>`;
                        content_html += '</a>';
                        content_html += `<p>${data.results[i].description}</p>`;
                        content_html += '</div>';
                        content_html += '</div>';
                        content_html += '</div>';
                        if (i % 4 == 3) {
                            content_html += '</section>';
                        }
                    }
                    if (data.results.length % 4 !== 0) {
                        content_html += '</section>';
                    }
                    content_html += '<div id="pagination_buttons_news">';
                    for (let i = 1; i <= Math.ceil(data.results.length / 4); i++) {
                        content_html += `<button type="button" id="page_${i}_news_button" class="page_button" onclick="showPage(${i}, 'news')">${i}</button>`;
                    }
                    content_html += '</div>';
                    document.getElementById('search-results-news-container').innerHTML = content_html;
                    showPage(1, 'news');
                } else {
                    document.getElementById('search-results-news-container').innerHTML = '<h2>No news found!</h2>';
                }
            });
    } else {
        document.getElementById('search-query-message').innerHTML = `?`;
        document.getElementById('search-results-events-container').innerHTML = '<h2>No search query provided!</h2>';
        document.getElementById('search-results-news-container').innerHTML = '<h2>No search query provided!</h2>';
    }
    if (username) {
        document.getElementById("page_header_user").innerHTML = `
            <div class="page_header_user">
                <div class= "page_header_username">
                    <a href="#">
                        <i class="fa-solid fa-user"></i>
                        <div id="username_box">
                            <p id="username_text">${username}</p>
                        </div>
                    </a>
                    <div class="dropdown_container">
                        <div id="dropdown_list">
                            <ul>
                                <li><a href="/userInformation">Profile</a></li>
                                <li><a href="/settings">Setting</a></li>
                                <li><a href="#" id="logout">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('logout').addEventListener('click', function (event) {
            event.preventDefault();
            logoutUser();
        });
    } else {
        document.getElementById("page_header_user").innerHTML = `
            <div class="page_header_user">
                <button type="button" id="login_btn" onclick="location.href='/login'">Log in</button>
                <button type="button" id="signup_btn" onclick="location.href='/signup'">Sign up</button>
            </div>
        `;
    }
};

function setCookie(name, value, maxAge) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + maxAge + "; path=/";
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

function deleteAllCookies() {
    document.cookie.split(";").forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    });
}

function logoutUser() {
    fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                deleteAllCookies();
                document.getElementById("page_header_user").innerHTML = `
                <div class="page_header_sign_up">
                    <button type="button" id="login_btn" onclick="location.href='/login'">Log in</button>
                    <button type="button" id="signup_btn" onclick="location.href='/signup'">Sign up</button>
                </div>
            `;
            } else {
                alert('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Logout failed');
        });
}