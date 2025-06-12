function postNews() {
    var input_body = document.getElementById("input_body").value;
    var input_title = document.getElementById("input_title").value;
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    /* 2. Open connection */
    xhttp.open("POST", "/postNews", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    /* 3. Send request */
    xhttp.send(JSON.stringify(
        {
            title: input_title,
            body: input_body,
            branches: 0
        }
    ));
}

function getBranchesForForm() {
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var branches = JSON.parse(xhttp.response);
            var input_branch = document.getElementById('input_branch');
            for (let i = 0; i < branches.length; i++) {
                input_branch.innerHTML += '<option value="' + branches[i].branch_name + '">' + branches[i].branch_name + '</option>';
            }
        }
    };
    /* 2. Open connection */
    xhttp.open("GET", "/getBranches", true);
    /* 3. Send request */
    xhttp.send();
}