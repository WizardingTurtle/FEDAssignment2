// code for homepage.html
// idea grab user info from session storage and display it
// api request to grab data for quizes to create objects

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
  fetch(`https://mydatabase-c3eb.restdb.io/rest/quiz`,settings)
  .then(response => response.json())
  .then(response => {
    console.log(response);
    quizDetails = response;
    displayQuizObjects(quizDetails);
  })
  .catch(error => {
    // Handle errors here
    console.error('Error get request failed:', error);;
  });
}

function displayQuizObjects (apiObject) {
  var quizCount = apiObject.length;
  console.log(quizCount);
  let Content = document.getElementById("content");

  for (var i = 0; i < quizCount; i++) {

    let newQuizDiv = document.createElement("div");
    newQuizDiv.classList.add("quiz-box");

    // great now we have to fetch the image really RESTDB??

    let newQuizImg = document.createElement("img");
    console.log(apiObject[i].quizimglink);

    if (apiObject[i].quizimglink != null) {
      newQuizImg.src = apiObject[i].quizimglink;
    }
    else {
      // ideally will use default img
    }

    newQuizImg.alt = "Quiz Icon";
    newQuizDiv.appendChild(newQuizImg);

    let newQuizName = document.createElement("h3");
    newQuizName.appendChild(document.createTextNode(apiObject[i].quizname));
    newQuizDiv.appendChild(newQuizName);

    let newQuizDesc = document.createElement("p");
    newQuizDesc.appendChild(document.createTextNode(apiObject[i].quizdesc));
    newQuizDiv.appendChild(newQuizDesc);

    Content.appendChild(newQuizDiv)

  }
}