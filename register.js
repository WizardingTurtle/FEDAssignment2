// code for register page
// idea - request data from restdb and check if account does not exist
// if true - create and post account to DB before showing homepage using selected profile
document.addEventListener("DOMContentLoaded", setupRegister);

// functions
// stop submit from refreshing
const subform = document.getElementById("loginbtn");
subform.addEventListener("click", submitFormReturn, false)
function submitFormReturn(event) {
    registerAccount();
    event.preventDefault();
}

function setupRegister() {
    hideMe();
}

function hideMe() {
    document.getElementById("add-update-msg").style.display = "none";
}

function confirmPassword() {
    let Password = document.getElementById("password").value;
    let PasswordConfirm = document.getElementById("passwordconfirm").value;

    console.log(Password)
    console.log(PasswordConfirm)
    if (Password == PasswordConfirm) {
        return true;
    } else {
        document.getElementById("add-update-msg").innerText = "Passwords do not match!";
        document.getElementById("add-update-msg").style.display = "inline";
        return false;
    }
}

function registerAccount() {
    // grab form data 
    let Username = document.getElementById("username").value;
    let Password = document.getElementById("password").value;

    // init api settings to query username
    const APIKEY = "6593f49e3ea4be628deb6cfa";

    let settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    fetch(`https://mydatabase-c3eb.restdb.io/rest/accounts?q={"username":"${Username}"}`, settings)
        .then(response => response.json())
        .then(response => {// check if account does not exist else cancel post request
            console.log(response);

            var size = Object.keys(response).length
            if (size == 0) {
                if (confirmPassword() == true) {
                    // init api settings to post 
                    let jsondata = {
                        "username": Username,
                        "password": Password
                    }

                    settings = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "x-apikey": APIKEY,
                            "Cache-Control": "no-cache"
                        },
                        body: JSON.stringify(jsondata),
                    }

                    // do a post request
                    fetch(`https://mydatabase-c3eb.restdb.io/rest/accounts`, settings)
                        .then(response => response.json())
                        .then(response => {
                            console.log("post has been sent")

                            // init username if not done yet
                            if (sessionStorage.getItem("Username") === null) {
                                sessionStorage.setItem("Username", Username)
                            }
                            document.getElementById("add-update-msg").innerText = "Account Succesfully created! jumping to homepage";
                            document.getElementById("add-update-msg").style.display = "inline";
                        })
                        .catch(error => {
                            // Handle errors here
                            console.error('Error get request failed:', error);
                            document.getElementById("add-update-msg").innerText = "GET REQUEST FAILED MISERABLY";
                            document.getElementById("add-update-msg").style.display = "inline";
                        });
                }
            }
            else {
                document.getElementById("add-update-msg").innerText = "Username already exists please choose another one";
                document.getElementById("add-update-msg").style.display = "inline";
                console.log("empty list lol")
            }
        })

    // check password is confirmed else show message saying password is not the same

}