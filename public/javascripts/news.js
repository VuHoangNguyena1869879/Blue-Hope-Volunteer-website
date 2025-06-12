function showPage(pageNumber, pageCount) {
    for (let i = 1; i <= pageCount; i++) {
        const page = document.getElementById(`page_${i}_interesting_news`);
        const button = document.getElementById(`page_${i}_button`);

        page.style.display = pageNumber === i ? "block" : "none";

        button.classList.toggle("active", pageNumber === i);

        button.style.textDecoration = pageNumber === i ? "underline" : "none";
        button.style.fontWeight = pageNumber === i ? "bold" : "normal";
    }
}

function showInterestingNews() {
    const searchResultsContainer = document.getElementById('search_results');
    const interestingNewsSections = document.querySelectorAll('.main_content_section[id^="page_"]');
    const interestingNewsHeader = document.getElementById('interesting_news_header');


    interestingNewsSections.forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById('pagination_buttons').style.display = 'none';

    interestingNewsHeader.style.display = 'none';

    searchResultsContainer.style.display = 'block';
}

function hideInterestingNews() {
    const interestingNewsSections = document.querySelectorAll('.main_content_section[id^="page_"]');
    const interestingNewsHeader = document.getElementById('interesting_news_header');

    interestingNewsSections.forEach((section, index) => {
        if (index === 0) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    document.getElementById('pagination_buttons').style.display = 'block';

    interestingNewsHeader.style.display = 'none';
}

function getAllContent() {
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var contents = JSON.parse(xhttp.response);
            var all_news = document.getElementById('all_news');
            var latest_news = document.getElementsByClassName('latest_news')[0];
            var content_html = "";
            let start_cnt = 0, end_cnt = 0;
            for (let i = 1; i < contents.length; i++) {
                if (i % 4 == 1) {
                    start_cnt++;
                    content_html += '<section id="page_' + (Math.floor(i / 4) + 1) + '_interesting_news" class="main_content_section" style="display: none;">';
                }
                content_html += '<div class="interesting_news">';
                content_html += '<div class="interesting_news_container">';
                content_html += '<div class="interesting_news_image">';
                content_html += '<a href="newsPage.html?idx=' + encodeURIComponent(contents[i].news_id) + '">';
                content_html += '<img src="' + contents[i].news_im_path + '" alt="' + contents[i].news_title + '">';
                content_html += '</a>';
                content_html += '</div>';
                content_html += '<div class="interesting_news_description">';
                content_html += '<a href="newsPage.html?idx=' + encodeURIComponent(contents[i].news_id) + '">';
                content_html += '<h2>' + contents[i].news_title + '</h2>';
                content_html += '</a>';
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
            content_html += '<div id="pagination_buttons">';
            let pageCount = Math.floor((contents.length - 2) / 4) + 1;
            for (let i = 1; i <= pageCount; i++) {
                content_html += '<button type="button" id="page_' + i + '_button" class="page_button" onclick="showPage(' + i + ',' + pageCount + ')">' + i + '</button>';
            }
            all_news.innerHTML = content_html;

            showPage(1, pageCount);

            var latest_news_html = "";
            latest_news.innerHTML = "";
            latest_news_html += '<h1>Latest News</h1>';
            latest_news_html += '<div class="news_info_container">';
            latest_news_html += '<a href="newsPage.html?idx=' + encodeURIComponent(contents[0].news_id) + '">';
            latest_news_html += '<img src="' + contents[0].news_im_path + '" alt="' + contents[0].news_title + '" id="milestone_img">';
            latest_news_html += '</a>';
            latest_news_html += '<div class="news_description">';
            latest_news_html += '<a href="newsPage.html?idx=' + encodeURIComponent(contents[0].news_id) + '" id="news_title">';
            latest_news_html += '<h1>' + contents[0].news_title + '</h1>';
            latest_news_html += '</a>';
            latest_news_html += '</div>';
            latest_news_html += '</div>';
            latest_news.innerHTML = latest_news_html;
        }
    };
    /* 2. Open connection */
    xhttp.open("GET", "/newsContent", true);
    /* 3. Send request */
    xhttp.send();
}

document.getElementById('news_search_form').addEventListener('submit', function (news) {
    news.preventDefault();
    const searchQuery = document.getElementById('news_search_box').value.toLowerCase().trim();
    const searchResultsContainer = document.getElementById('search_results');

    fetch(`/search-news?query=${encodeURIComponent(searchQuery)}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                const interestingNewsHeader = document.getElementById('interesting_news_header');
                var all_news = document.getElementById('all_news');
                var content_html = "";
                let start_cnt = 0, end_cnt = 0;
                // console.log(data.results);
                for (let i = 0; i < data.results.length; i++) {
                    if (i % 4 == 0) {
                        start_cnt++;
                        content_html += '<section id="page_' + (i / 4 + 1) + '_interesting_news" class="main_content_section" style="display: none;">';
                    }
                    content_html += '<div class="interesting_news">';
                    content_html += '<div class="interesting_news_container">';
                    content_html += '<div class="interesting_news_image">';
                    content_html += '<a href="newsPage.html?idx=' + encodeURIComponent(data.results[i].news_id) + '">';
                    content_html += '<img src="' + data.results[i].image + '" alt="' + data.results[i].title + '">';
                    content_html += '</a>';
                    content_html += '</div>';
                    content_html += '<div class="interesting_news_description">';
                    content_html += '<a href="newsPage.html?idx=' + encodeURIComponent(data.results[i].news_id) + '">';
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
                content_html += '<div id="pagination_buttons">';
                let pageCount = Math.floor((data.results.length - 1) / 4) + 1;
                for (let i = 1; i <= pageCount; i++) {
                    content_html += '<button type="button" id="page_' + i + '_button" class="page_button" onclick="showPage(' + i + ',' + pageCount + ')">' + i + '</button>';
                }
                all_news.innerHTML = content_html;
                searchResultsContainer.innerHTML = '<h2>Search results:</h2>';
                interestingNewsHeader.style.display = 'none';
                showPage(1, pageCount);
            } else {
                searchResultsContainer.innerHTML = '<h2>No news found!<br><br>Also some interesting news below...</h2>';
                hideInterestingNews();
            }
        });
});

document.addEventListener('DOMContentLoaded', function () {
    checkUserRole();
});

function checkUserRole() {
    const userRole = getCookie("userRole");

    if (userRole === "manager" || userRole === "admin") {
        document.getElementById("addNewsButton").style.display = "block";
    } else {
        document.getElementById("addNewsButton").style.display = "none";
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