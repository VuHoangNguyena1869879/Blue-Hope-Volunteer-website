function postEvent() {
    var input_date = document.getElementById("input_date").value;
    var input_time = document.getElementById("input_time").value;
    var input_location = document.getElementById("input_location").value;
    var input_type = document.getElementById("input_type").value;
    var input_status = document.getElementById("input_status").value;
    var input_content = document.getElementById("input_content").value;
    var input_title = document.getElementById("input_title").value;
    /* 1. Create new AJAX request */
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.response);
        }

        if (this.status == 500) {
            return;
        }
    };
    /* 2. Open connection */
    xhttp.open("POST", "/postEvent", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    /* 3. Send request */
    xhttp.send(JSON.stringify(
        {
            title: input_title,
            content: input_content,
            date: input_date,
            time: input_time,
            location: input_location,
            type: input_type,
            status: input_status
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

function setMinTime() {
    var input_start_time = document.getElementById('input_start_time');
    var input_end_time = document.getElementById('input_end_time');
    input_end_time.min = input_start_time.value;
}

function setMaxTime() {
    var input_start_time = document.getElementById('input_start_time');
    var input_end_time = document.getElementById('input_end_time');
    input_start_time.max = input_end_time.value;
}