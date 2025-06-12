var userItem = {};

function displayPage() {
    const queryString = window.location.search;
    const decodedQS = decodeURIComponent(queryString);
    const URLParams = new URLSearchParams(decodedQS);

    // console.log(URLParams);

    const r = getCookie('userRole');
    if (r == 'admin') {
        let option = document.createElement('option');
        option.setAttribute('value','admin');
        option.innerText= 'Admin';
        document.getElementById('role_select').appendChild(option);
    }

    const email = URLParams.get('email');
    const phone = URLParams.get('phone');
    const id = URLParams.get('id');
    // console.log('id');
    const full_name = URLParams.get('full_name');
    document.getElementById('user_email').placeholder = email;
    // document.getElementById('phone').value = phone;
    document.getElementById('full_name').placeholder = full_name;
    document.getElementById('id').value = id;
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

function handleForm(event) {
    event.preventDefault();
    // console.log('weqwdqdqwd');
    updateUserInfo();
}

document.addEventListener('DOMContentLoaded', (event) => {
document.getElementById("form").addEventListener("submit", handleForm);
});


function updateUserInfo() {
    const form = document.getElementById('form');
    let formData = new FormData(form);
    let jsonObject = {};
    for (const p of formData) {
        jsonObject[p[0]]=p[1];
    }
    // console.log(jsonObject);
    document.getElementById('submit-btn').classList.add('hide');
    let waiting = document.createElement('div');
    waiting.setAttribute('id','waiting');
    waiting.innerText = 'Updating';
    let bouncy1 = document.createElement('span');
    let bouncy2 = document.createElement('span');
    let bouncy3 = document.createElement('span');
    bouncy1.classList.add('bouncy2');
    bouncy2.classList.add('bouncy2');
    bouncy3.classList.add('bouncy2');
    bouncy2.setAttribute('id','second');
    bouncy3.setAttribute('id','third');
    bouncy1.innerText='.';
    bouncy2.innerText='.';
    bouncy3.innerText='.';
    waiting.appendChild(bouncy1);
    waiting.appendChild(bouncy2);
    waiting.appendChild(bouncy3);
    document.getElementById('last_box').appendChild(waiting);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (this.status == 500) {
                setTimeout(function () {
                    waiting.innerHTML = this.responseText;
                    waiting.setAttribute('id','error');
                },2000);
                setTimeout(function () {
                    window.location.href = '/manageUser';
                },2000);
            } else if (this.status == 200) {
                setTimeout(function () {
                    waiting.innerHTML = 'Updated successfully! Returning...';
                    waiting.setAttribute('id','successful');
                },2000);
                setTimeout(function () {
                    window.location.href = '/manageUser';
                },4000);
            }
        }
    };

    xhttp.open('POST','/editUserInfo',true);
    xhttp.setRequestHeader('Content-type','application/JSON');
    xhttp.send(JSON.stringify(jsonObject));
}