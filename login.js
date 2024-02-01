// code for login page
// idea - request data from restdb and check if account is valid
// if correct - show homepage using selected profile

document.addEventListener("DOMContentLoaded", Setup);



// functions

// stop submit from refreshing
const subform = document.getElementById("loginbtn");
subform.addEventListener("click",submitFormReturn,false)

function submitFormReturn(event) {
  VerifyLogin();
  event.preventDefault();
}

// Initialize page function
function Setup() {
  HideMe();
}

// hide alerts function
function HideMe () {
  document.getElementById("add-update-msg").style.display = "none";
}


// validate account function
function ValidateAccount (DBpassword, Password) {

  var validify = false;

  if (DBpassword == Password) {
    validify = true;
  }
  else {
    document.getElementById("add-update-msg").style.display = "inline";
  }
  

  if (validify == true) {
      window.location.href("homepage.html")
      //ideally will remember login credentials throughout the website
  }
}

// verify account details function - uses GET request
function VerifyLogin() {

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
      ValidateAccount(response[0].password, Password);
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

  

  