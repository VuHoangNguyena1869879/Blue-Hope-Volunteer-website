function setCookie(name, value, maxAge) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + maxAge + "; path=/";
}

// Function to get a cookie
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

function getBranches() {
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
}