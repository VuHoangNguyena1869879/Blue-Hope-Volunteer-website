function getAllUsers() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && this.status == 200) {
            const users = JSON.parse(this.response);
            for (let i = 0; i < users.length; i++) {
                let user_list = document.getElementById('info_list');
                let list_item = document.createElement('li');
                let edit = document.createElement('div');
                let mail = document.createElement('div');
                let phone = document.createElement('div');
                let name = document.createElement('div');
                let id = document.createElement('div');
                let role = document.createElement('i');
                let full_name = document.createElement('span');
                mail.classList.add('mail');
                mail.title = 'Email';
                phone.classList.add('phone');
                phone.title = 'Phone';
                name.classList.add('name');
                id.classList.add('id');
                id.title = 'User ID';
                edit.classList.add('edit');
                full_name.classList.add('full_name');
                let role_display = users[i].role == 'user' ? 'volunteer' : users[i].role;
                role.innerText = '/' + role_display;
                full_name.innerText = users[i].full_name;
                full_name.title = users[i].full_name;
                name.appendChild(full_name);
                name.appendChild(role);
                if (users[i].role == 'user') {
                    name.classList.add('volunteer');
                } else {
                    name.classList.add(users[i].role);
                }
                let mail_link = document.createElement('a');
                mail_link.href = 'mailto:' + users[i].email;
                mail_link.innerText = users[i].email;
                mail.appendChild(mail_link);
                phone.innerText = users[i].phone;
                id.innerText = users[i].user_id;
                let edit_img = document.createElement('img');
                edit_img.setAttribute('src','/images/edit.png');
                edit_img.setAttribute('alt','edit icon');
                let queryPhone = users[i].phone.toString();
                let queryEmail = users[i].email.toString();
                let queryFullname = users[i].full_name.toString();
                let queryId = users[i].user_id;
                let queryString = "phone="+ queryPhone +"&email="+ queryEmail +"&full_name="+ queryFullname +"&id="+ queryId;
                let encodedQueryString = encodeURIComponent(queryString);
                let redirect_link = 'window.location.href="editUser?'+ encodedQueryString + '"';
                edit_img.setAttribute('onclick',redirect_link);
                edit_img.title = 'Edit Role';
                edit.appendChild(edit_img);
                list_item.appendChild(name);
                list_item.appendChild(mail);
                list_item.appendChild(phone);
                list_item.appendChild(id);
                list_item.appendChild(edit);
                user_list.appendChild(list_item);
            }
        }
    };

    xhttp.open('GET','/manageAllUsers',true);
    xhttp.send();
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
    searchUsers();
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("user_search_form").addEventListener("submit", handleForm);
});

function searchUsers() {
    const form = document.getElementById('user_search_form');
    let form_data = new FormData(form);
    let jsonObject = {};
    for (const p of form_data) {
        jsonObject[p[0]]=p[1];
    }
    console.log(jsonObject);
    if (!jsonObject['query']) {
        document.getElementById('info_section').innerHTML = '<h2>No email provided</strong></h2>';
        setTimeout(function () {
            window.location.href = '/manageUser';
        },2000);
        return;
    }

    let xhttp = new XMLHttpRequest ();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && this.status == 200) {
            const users = JSON.parse(this.response);
            if (users.length == 0) {
                document.getElementById('info_section').innerHTML = '<h2>No such email found!</h2>';
                setTimeout(function () {
                    window.location.href = '/manageUser';
                },2000);
                return;
            }
            document.getElementById('info_list').innerHTML = ``;
            for (let i = 0; i < users.length; i++) {
                let user_list = document.getElementById('info_list');
                let list_item = document.createElement('li');
                let edit = document.createElement('div');
                let mail = document.createElement('div');
                let phone = document.createElement('div');
                let name = document.createElement('div');
                let id = document.createElement('div');
                let role = document.createElement('i');
                let full_name = document.createElement('span');
                mail.classList.add('mail');
                mail.title = 'Email';
                phone.classList.add('phone');
                phone.title = 'Phone';
                name.classList.add('name');
                id.classList.add('id');
                id.title = 'User ID';
                edit.classList.add('edit');
                full_name.classList.add('full_name');
                let role_display = users[i].role == 'user' ? 'volunteer' : users[i].role;
                role.innerText = '/' + role_display;
                full_name.innerText = users[i].full_name;
                full_name.title = users[i].full_name;
                name.appendChild(full_name);
                name.appendChild(role);
                if (users[i].role == 'user') {
                    name.classList.add('volunteer');
                } else {
                    name.classList.add(users[i].role);
                }
                let mail_link = document.createElement('a');
                mail_link.href = 'mailto:' + users[i].email;
                mail_link.innerText = users[i].email;
                mail.appendChild(mail_link);
                phone.innerText = users[i].phone;
                id.innerText = users[i].user_id;
                let edit_img = document.createElement('img');
                edit_img.setAttribute('src','/images/edit.png');
                edit_img.setAttribute('alt','edit icon');
                let queryPhone = users[i].phone;
                let queryEmail = users[i].email;
                let queryFullname = users[i].full_name;
                let queryId = users[i].user_id;
                let queryString = "phone="+ queryPhone +"&email="+ queryEmail +"&full_name="+ queryFullname +"&id="+ queryId;
                let encodedQueryString = encodeURIComponent(queryString);
                let redirect_link = 'window.location.href="editUser?'+ encodedQueryString + '"';
                edit_img.setAttribute('onclick',redirect_link);
                edit_img.title = 'Edit Role';
                edit.appendChild(edit_img);
                list_item.appendChild(name);
                list_item.appendChild(mail);
                list_item.appendChild(phone);
                list_item.appendChild(id);
                list_item.appendChild(edit);
                user_list.appendChild(list_item);
            }
        }
    };

    xhttp.open('POST','/search-email',true);
    xhttp.setRequestHeader('Content-type','application/JSON');
    xhttp.send(JSON.stringify(jsonObject));
}



