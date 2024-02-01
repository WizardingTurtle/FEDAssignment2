// code for homepage.html
// idea grab user info from session storage and display it
// api request to grab data for quizes to create objects
if (typeof(Storage) !== "undefined") {
    // session storage brea
    Storage = sessionStorage
  } else {
    console.log("error! session storage does not exist! account credentials will not be remembered")
  }

document.addEventListener("DOMContentLoaded", SetupHome);

function SetupHome() {
    document.getElementById("usernameHome").innerHTML = sessionStorage.getItem('Username');
}

