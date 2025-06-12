function setQuery() {
    let query = encodeURIComponent('=ADD');
    let add = 'window.location.href='+ '"' +'branchManager?Q'+ query + '"';
    document.getElementById('add_btn').setAttribute('onclick',add);
}


function deleteBranch(ele) {
    let parent = ele.parentElement;
    const branch_id = parent.querySelector('.branch_id').innerText;
    const branch_name = parent.querySelector('.branch_name').innerText;
    // let xhttp = new XMLHttpRequest();
    if (!window.confirm('Are you sure you want to delete branch "'+ branch_name +'"?')) {
        return;
    }
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && this.status == 200) {
            window.location.href = '/manageBranches';
        }
    };

    xhttp.open('POST','/deleteBranch',true);
    xhttp.setRequestHeader('Content-type','application/JSON');
    xhttp.send(JSON.stringify({
        id : branch_id
    }));
}



function getAllBranch() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && this.status == 200) {
            const branches = JSON.parse(this.response);
            let totalPages = Math.ceil(branches.length/5);
            
            for (let i = 0; i < branches.length; i++) {
                let branch_list = document.getElementById('info_list');
                let list_item = document.createElement('li');
                let edit = document.createElement('div');
                let manager_email = document.createElement('div');
                let manager_id = document.createElement('div');
                let manager_name = document.createElement('div');
                let branch_id = document.createElement('div');
                let branch_name = document.createElement('div');
                let delete_btn = document.createElement('button');
                delete_btn.id = 'delete_btn';
                delete_btn.type = 'button';
                delete_btn.setAttribute('onclick','deleteBranch(this)');
                delete_btn.innerText = 'Delete';
                manager_email.title = 'Manager email';
                manager_email.classList.add('manager_email');
                branch_name.title = 'Branch name';
                branch_name.classList.add('branch_name');
                manager_id.classList.add('manager_id');
                branch_id.classList.add('branch_id');
                branch_id.title = 'Branch ID';
                manager_name.classList.add('manager_name');
                edit.classList.add('edit');
                let edit_img = document.createElement('img');
                edit_img.src = '/images/edit.png';
                edit_img.alt = 'Edit branch';
                edit.appendChild(edit_img);
                edit.title = 'Assign manager or Change branch name';
                // let query = encodeURIComponent('=EDIT');
                // let edit_query = 'window.location.href='+ '"' +'branchManager?Q'+ query + '"';
                // edit.setAttribute('onclick',edit_query);
                edit.setAttribute('onclick','displayEdit(this)');
                branch_name.innerHTML = branches[i].branch_name;
                branch_id.innerText = branches[i].branch_id;
                if (!branches[i].email) {
                    manager_email.innerText = 'Not found';
                    manager_email.classList.add('error');
                    manager_email.title = 'Manager Email not found';
                } else {
                    manager_email.innerText = branches[i].email;
                }
                if (!branches[i].user_id) {
                    manager_id.innerText = '00';
                    manager_name.classList.add('error');
                    manager_id.title = 'Manager ID not found';
                } else {
                    manager_id.innerText = branches[i].user_id;
                    manager_id.title = 'Manager ID';
                }
                if (!branches[i].full_name) {
                    manager_name.innerText = 'Not found';
                    manager_name.classList.add('error');
                    manager_name.title = 'Manager Name not found';
                } else {
                    manager_name.innerText = branches[i].full_name;
                    manager_name.title = 'Manager Name';

                }
                list_item.appendChild(branch_name);
                list_item.appendChild(branch_id);
                list_item.appendChild(manager_name);
                list_item.appendChild(manager_id);
                list_item.appendChild(manager_email);
                list_item.appendChild(edit);
                list_item.appendChild(delete_btn);
                branch_list.appendChild(list_item);
            }
        }
    };

    xhttp.open('GET','/getAllBranch',true);
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

function displayEdit(ele) {
    let parent = ele.parentElement;
    const branch_name = parent.querySelector('.branch_name');
    const branch_id = parent.querySelector('.branch_id').innerText;
    // const edit_form = branch_name.querySelector('#edit_form');
    branch_name.innerHTML = ``;
    branch_name.innerHTML = `<form action='/editBranch' method='post' id='name_form'>
    <input type='text' id='name_input' name='branch_name' placeholder='Enter a name' required>
    <input type='hidden' name='branch_id' value=${branch_id}>
    <input type='submit' id='name_submit' value='Done'>
    </form>`;
    const manager_id = parent.querySelector('.manager_id');
    manager_id.innerHTML = `<form action='/editManager' method='post' id='id_form'>
    <input type='text' id='id_input' name='manager_id' pattern='[0-9]{0-10}' placeholder='ID' title='Assign a manager ID' required>
    <input type='hidden' name='branch_id' value=${branch_id}>
    <input type='submit' id='id_submit' value='Done'>
    </form>`;
}

