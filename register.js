// code for register page
// idea - request data from restdb and check if account does not exist
// if true - create and post account to DB before showing homepage using selected profile
document.addEventListener("DOMContentLoaded", setupRegister);
const APIKEY = "6593f49e3ea4be628deb6cfa";
// functions
// stop submit from refreshing 
const subform = document.getElementById("loginbtn");
subform.addEventListener("click", submitFormReturn, false)

// validate form data and registers account and jump to homepage
async function submitFormReturn(event) {
    document.getElementById("add-update-msg").style.display = "none"
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("passwordconfirm").value;
    console.log("sfr- validateusername is called");
    if (validateUsername(username)) {
        console.log("sfr- confirmPassword is called");
        if (confirmPassword(password, passwordConfirm)) {
            console.log("sfr- registerAccount is called");
            registerAccount(username, password);

            // delay function check since api takes a while

            console.log("sfr- registerSuccesful is called");
            let success = registerSuccessful(username);
            console.log("sfr- success data is logged" + success);
            if (success == true) {
                // jumps to homepage if form validation and registration are successful
                window.location.assign("./homepage.html");
                console.log("it done");
            }

        }
    }
    event.preventDefault();
}

async function fetchQueryUsername(Usernamer) {
    let success = false;

    let settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    console.log("fqu-get response occurs")
    return fetch(`https://mydatabase-c3eb.restdb.io/rest/accounts?q={"username":"${Usernamer}"}`, settings)
        .then(response => response.json())
        .then(response => {// check if account does not exist else cancel post request
            console.log(response);

            var size = Object.keys(response).length
            if (size > 0) {
                success = true;
                console.log("success set to true");
                console.log(success);
            }
            console.log("fqu- success is " + success);
            console.log("fqu- process ends within fetch");
            return success;
        })
        .catch(error => {
            // Handle errors here
            console.error('Error get request failed:', error);
            document.getElementById("add-update-msg").innerText = "GET REQUEST FAILED MISERABLY";
            document.getElementById("add-update-msg").style.display = "inline";
        });

}
// checks and returns true if username exists in database
async function registerSuccessful(Username) {
    let success = false;
    success = fetchQueryUsername(Username);
    console.log("rs- success is " + success);
    return success;
}

// runs functions that will start on page load
function setupRegister() {
    hideMe();
}

// hide elements
function hideMe() {
    document.getElementById("add-update-msg").style.display = "none";
}

// returns true for string containing number
function hasNumber(str) {
    return /\d/.test(str);
}

// checks for 3 conditions to return true
// password is more than/equals 8 char
// password contains number
// password and confirm password are the same
function confirmPassword(password, passwordConfirm) {
    console.log("cp- process starts");
    console.log(password)
    console.log(passwordConfirm)

    if (password.length >= 8) {
        if (hasNumber(password)) {
            if (password == passwordConfirm) {
                console.log("cp- process ends");
                return true;
            } else {
                document.getElementById("add-update-msg").innerText = "Passwords do not match!";
            }
        } else {
            document.getElementById("add-update-msg").innerText = "Password needs to have at least 1 number";
        }
    } else {
        document.getElementById("add-update-msg").innerText = "Password needs to be at least 8 characters long";
    }
    document.getElementById("add-update-msg").style.display = "inline";
    console.log("cp- process ends");
    return false;
}

// checks if username is at least 3 characters long
function validateUsername(Username) {
    console.log("vu- process starts");
    if (Username.length >= 3) {
        console.log("vu- process ends");
        return true;
    } else {
        document.getElementById("add-update-msg").innerText = "Username needs to be at least 3 characters long";
        document.getElementById("add-update-msg").style.display = "inline";
        console.log("vu- process ends");
        return false;
    }
}

// registers account if the form has valid data - return true if successful
async function registerAccount(Username, Password) {
    // init api settings to query username

    let settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    console.log("ra-get response occurs")
    fetch(`https://mydatabase-c3eb.restdb.io/rest/accounts?q={"username":"${Username}"}`, settings)
        .then(response => response.json())
        .then(response => {// check if account does not exist else cancel post request
            console.log(response);

            var size = Object.keys(response).length
            if (size == 0) {
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
                console.log("ra-post response occurs")
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
                        console.log("ra- proccess ends inside of fetch")
                    })
                    .catch(error => {
                        // Handle errors here
                        console.error('Error get request failed:', error);
                        document.getElementById("add-update-msg").innerText = "GET REQUEST FAILED MISERABLY";
                        document.getElementById("add-update-msg").style.display = "inline";
                        console.log("returned false")
                    });

            }
            else {
                document.getElementById("add-update-msg").innerText = "Username already exists please choose another one";
                document.getElementById("add-update-msg").style.display = "inline";
                console.log("empty list lol")
            }
        })
    console.log("ra- proccess ends outside of fetch")
}