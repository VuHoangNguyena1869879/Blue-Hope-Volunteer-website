
const queryString = window.location.search;
const urlParams = new URLSearchParams(decodeURIComponent(queryString));
const queryType = urlParams.get('Q');

function displayForm() {
    if (queryType == 'ADD') {
        document.getElementById('container_new').innerHTML=``;
        document.getElementById('container_new').classList.add('hide');
        document.getElementById('new_label').classList.add('hide');
        document.getElementById("old_label").innerText = 'Enter a name for this branch' + ':';
        document.getElementById("old").placeholder = 'Enter a branch name for this new branch';
        document.getElementById("submit-btn").value = 'Add Branch';
    } else {
        console.log('Unexpected error!');
    }
}

function handleForm(event) {
    event.preventDefault();
    if (queryType == 'ADD') {
        console.log('Add');
        addBranch();
    } else {
        console.log('Unexpected error');
        return;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
document.getElementById("change_form").addEventListener("submit", handleForm);
});

function addBranch() {
    const form = document.getElementById('change_form');
    let formData = new FormData(form);
    let jsonObject = {};
    for (const p of formData) {
        jsonObject[p[0]]=p[1];
    }
    // console.log(jsonObject);
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = '/manageBranches';
        }
    };

    xhttp.open('POST','/addBranch',true);
    xhttp.setRequestHeader('Content-type','application/JSON');
    xhttp.send(JSON.stringify(jsonObject));
}

