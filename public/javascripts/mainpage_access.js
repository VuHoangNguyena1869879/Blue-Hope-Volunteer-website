function process_content() {
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 4. Handle response (callback function) */
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(xhttp.response);
            var events = data.events;
            var news = data.news;
            var events_html = "";
            var news_html = "";

            // Process events
            events.forEach((event, index) => {
                if (index < 4) {
                  events_html += '<div class="event_card">';
                  events_html += '<a href="eventPage.html?idx=' + encodeURIComponent(event.event_id) + '">';
                  events_html += '<img src="' + event.event_im_path + '" alt="' + event.event_name + '" class="event_image">';
                  events_html += '</a>';
                  events_html += '<a href="eventPage.html?idx=' + encodeURIComponent(event.event_id) + '">';
                  events_html += '<div class="event_text">';
                  events_html += `<h2 class="content_heading">${event.event_name}</h2>`;
                  events_html += '</div>';
                  events_html += '</a>';
                  events_html += '</div>';
                }
              });


            document.getElementsByClassName('latest_content')[0].innerHTML = events_html;

            // Process news
            news.forEach((newsItem, index) => {
                if (index < 3) {
                    news_html += '<div class="news_card">';
                    news_html += '<a href="newsPage.html?idx=' + encodeURIComponent(newsItem.news_id) + '">';
                    news_html += '<img src="' + newsItem.news_im_path + '" alt="' + newsItem.news_title + '" class="news_image">';
                    news_html += '</a>';
                    news_html += '<a href="newsPage.html?idx=' + encodeURIComponent(newsItem.news_id) + '">';
                    news_html += '<div class="news_text">';
                    news_html += `<h2 class="content_heading">${newsItem.news_title}</h2>`;
                    news_html += '</div>';
                    news_html += '</a>';
                    news_html += '</div>';
                }
            });

            document.getElementsByClassName('latest_content_news')[0].innerHTML = news_html;
        }
    };
    /* 2. Open connection */
    xhttp.open("GET", "/mainpage", true);
    /* 3. Send request */
    xhttp.send();
}
