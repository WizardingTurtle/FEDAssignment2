// code for login page
// idea - request data from restdb and check if account is valid
// if correct - show homepage using selected profile
document.addEventListener("DOMContentLoaded", setupLogin);

// functions
// stop submit from refreshing
const subform = document.getElementById("loginbtn");
subform.addEventListener("click",submitFormReturn,false)

function submitFormReturn(event) {
  verifyLogin();
  event.preventDefault();
}

// Initialize page function
function setupLogin() {
  hideMe();
}

// hide alerts function
function hideMe () {
  document.getElementById("add-update-msg").style.display = "none";
}


// validate account function
function validateAccount (DBpassword, Password) {

  if (DBpassword == Password) {
    // store user credentials in session storage to make pulling info easier
    sessionStorage.setItem('Username',document.getElementById("username").value);
    sessionStorage.setItem('Password',document.getElementById("password").value);
    window.location.assign("./homepage.html")
    //ideally will remember login credentials throughout the website
  }
  else {
    document.getElementById("add-update-msg").style.display = "inline";
  }
}

// verify account details function - uses GET request
function verifyLogin() {

  let Username = document.getElementById("username").value;
  let Password = document.getElementById("password").value;  

  // initilize settings for GET request

  // API key
  const APIKEY = "6593f49e3ea4be628deb6cfa";

  let settings = {
    method: 'GET',
    headers: {
    // Specify the content type as JSON
    // You can include additional headers if needed
    // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json', 
    "x-apikey": APIKEY,
    "Cache-Control": "no-cache"
    },
  }

  // fetch data and check if password valid
  fetch(`https://mydatabase-c3eb.restdb.io/rest/accounts?q={"username":"${Username}"}`,settings)
  .then(response => response.json())
  .then(response => {
    // Handle the JSON data here
    console.log(response);
    if (response[0].hasOwnProperty("password")) {
      validateAccount(response[0].password, Password);
    }
    else {
      document.getElementById("add-update-msg").innerText = "Account does not exist";
      document.getElementById("add-update-msg").style.display = "inline";
    }
  })
  .catch(error => {
    // Handle errors here
    console.error('Error get request failed:', error);
    document.getElementById("add-update-msg").innerText = "GET REQUEST FAILED MISERABLY";
    document.getElementById("add-update-msg").style.display = "inline";
  });
}  