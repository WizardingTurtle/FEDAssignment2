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
    addQuizObjects();
}

const quizArray = [];

// grab quiz details from api and then create a quiz object per quiz grabbed and add to quizArray
function addQuizObjects() {

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
  //fetch from quiz and create quiz object based on api info
  fetch(`https://mydatabase-c3eb.restdb.io/rest/accounts?q={"username":"${Username}"}`,settings)
  .then(response => response.json())
  .then(response => {})
}

function displayQuizObjects () {

}