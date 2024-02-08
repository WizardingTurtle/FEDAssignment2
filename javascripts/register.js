// code for register page
// idea - request data from restdb and check if account does not exist
// if true - create and post account to DB before showing homepage using selected profile
document.addEventListener("DOMContentLoaded", setupRegister);
const APIKEY = "65c099ce00d3da1e0863a2dd";
// functions
// stop submit from refreshing 
const subform = document.getElementById("loginbtn");
subform.addEventListener("click", submitFormReturn, false)

// validate form data and registers account and jump to homepage
function submitFormReturn(event) {

    document.getElementById("add-update-msg").style.display = "none"
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("passwordconfirm").value;
    event.preventDefault();
    console.log("sfr- validateusername is called");
    if (validateUsername(username)) {
        console.log("sfr- confirmPassword is called");
        if (confirmPassword(password, passwordConfirm)) {
            // registerAccount handles check for existing username + successful registration + jumping to homepage 
            console.log("sfr- registerAccount is called");
            registerAccount(username, password);
        }
    }
}

// runs functions that will start on page load
function setupRegister() {
    hideMe();
}

// hide elements - add more if needed
function hideMe() {
    document.getElementById("add-update-msg").style.display = "none";
}

// returns true for string containing number
function hasNumber(str) {
    return /\d/.test(str);
}

function hasLetter(str) {
    return /[a-zA-Z]/.test(str);
}

// returns true for strings containing special char
function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
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
        if (hasNumber(password) && hasLetter(password)) {
            if (password == passwordConfirm) {
                console.log("cp- process ends");
                return true;
            } else {
                document.getElementById("add-update-msg").innerText = "Passwords do not match!";
            }
        } else if (hasNumber(password)) {
            document.getElementById("add-update-msg").innerText = "Password needs to have at least 1 letter";
        } else if (hasLetter(password)) {
            document.getElementById("add-update-msg").innerText = "Password needs to have at least 1 number";
        } else {
            document.getElementById("add-update-msg").innerText = "Password needs to have numbers and letters";
        }
    } else {
        document.getElementById("add-update-msg").innerText = "Password needs to be at least 8 characters long";
    }
    document.getElementById("add-update-msg").style.display = "inline";
    console.log("cp- process ends");
    return false;
}

// checks if username is at least 3 characters long & has no special characters else return false
function validateUsername(Username) {
    console.log("vu- process starts");
    if (Username.length >= 3) {
        if (containsSpecialChars(Username) == false) {
            if (hasLetter(Username)) {
                console.log("vu- process ends");
            return true;
            } else {
                document.getElementById("add-update-msg").innerText = "Username must have a letter";
                document.getElementById("add-update-msg").style.display = "inline";
                console.log("vu- process ends");
                return false;
            }
        } else {
            document.getElementById("add-update-msg").innerText = "Username cannot contain special characters";
            document.getElementById("add-update-msg").style.display = "inline";
            console.log("vu- process ends");
            return false;
        }
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
    fetch(`https://firestoredb-a218.restdb.io/rest/account?q={"username":"${Username}"}`, settings)
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

                // do a post request to create account
                console.log("ra-post response occurs")
                fetch(`https://firestoredb-a218.restdb.io/rest/account`, settings)
                    .then(response => response.json())
                    .then(response => {
                        console.log("post has been sent");
                        console.log(response);

                        // init username if not done yet
                        if (sessionStorage.getItem("Username") === null) {
                            sessionStorage.setItem("Username", Username)
                        }
                        document.getElementById("add-update-msg").innerText = "Account Succesfully created! jumping to homepage";
                        document.getElementById("add-update-msg").style.display = "inline";

                        setTimeout(window.location.assign("./homepage.html"), 2000)
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