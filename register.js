document.addEventListener("DOMContentLoaded", SetupRegister);

// functions
// stop submit from refreshing
const subform = document.getElementById("loginbtn");
subform.addEventListener("click",submitFormReturn,false)

function setupRegister(){
    hideMe();
}

function hideMe () {
    document.getElementById("add-update-msg-reg").style.display = "none";
}

function ValidateFormData(username, DBusername) {
    if (username != DBusername) {
        Password = document.getElementById("newPassword");
        PasswordConfirm = document.getElementById("newPasswordConfirm");
        if (Password == PasswordConfirm) {
            return true;
        } else {
            document.getElementById("add-update-msg-reg").innerText = "Passwords do not match!";
            document.getElementById("add-update-msg-reg").style.display = "inline";
            return false;
        }
    } else {     
        document.getElementById("add-update-msg-reg").innerText = "Username already exists, choose another one"; 
        document.getElementById("add-update-msg-reg").style.display = "inline";
        return false;
    }
}

function registerAccount() {
    // grab form data 
    Username = document.getElementById("newUsername");
    Password = document.getElementById("newPassword");
    PasswordConfirm = document.getElementById("newPasswordConfirm");

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

            if (ValidateFormData(Username, response[0].username)) {
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
                fetch(`https://mydatabase-c3eb.restdb.io/rest/accounts?q={"username":"${Username}"}`, settings)
                .then(response => response.json())
                .then(response => {

                    // init username if not done yet
                    if (sessionStorage.getItem("Username") === null) {
                        sessionStorage.setItem("Username", Username)
                    }
                    document.getElementById("add-update-msg-reg").innerText = "Account Succesfully created! jumping to homepage"; 
                    document.getElementById("add-update-msg-reg").style.display = "inline";
                })
                .catch(error => {
                    // Handle errors here
                    console.error('Error get request failed:', error);
                    document.getElementById("add-update-msg").innerText = "GET REQUEST FAILED MISERABLY";
                    document.getElementById("add-update-msg").style.display = "inline";
                  });

                
            } 
    })

    // check password is confirmed else show message saying password is not the same
    
}