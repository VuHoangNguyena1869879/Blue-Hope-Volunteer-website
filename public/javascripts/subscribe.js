document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.subscribe_btn').addEventListener('click', function() {
        const firstName = document.getElementById('subscribe_first_name').value;
        const familyName = document.getElementById('subscribe_family_name').value;
        const email = document.getElementById('email_text').value;
        const city = document.getElementById('subscribe_city').value;

        const messageContainer = document.getElementById('subscription_message');
        messageContainer.innerHTML = ''; // Clear any previous messages

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 201 || this.status == 200) {
                    messageContainer.innerHTML = '<p class="success-message">Subscription successful! A confirmation email has been sent.</p>';
                } else if (this.status == 409) {
                    messageContainer.innerHTML = '<p class="error-message">Subscription failed: Email already exists.</p>';
                } else if (this.status == 400) {
                    messageContainer.innerHTML = '<p class="error-message">Subscription failed: All fields are required.</p>';
                } else {
                    messageContainer.innerHTML = '<p class="error-message">Subscription failed: An unexpected error occurred. Please try again later.</p>';
                }
            }
        };
        xhttp.open("POST", "/subscribe", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({
            firstname: firstName,
            familyname: familyName,
            email: email,
            city: city
        }));
    });
});
