// code for homepage.html
// idea grab user info from session storage and display it
// api request to grab data for quizes to create objects
const APIKEY = "6593f49e3ea4be628deb6cfa";

document.addEventListener("DOMContentLoaded", SetupHome);

const subsearch = document.getElementById("search-bar-input");
subsearch.addEventListener('keypress', submitSearchReturn);

function submitSearchReturn(e) {
  if (e.key === 'Enter') {
    searchQuiz();
  }
}

function SetupHome() {
  document.getElementById("usernameHome").innerHTML = sessionStorage.getItem('Username');
  getUserRanking();
  getQuizObjects();
}

const jsonQuizArray = [];

// grab quiz details from api and then create a quiz object per quiz grabbed and add to quizArray
async function getQuizObjects() {

  let settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
  }

  // fetch data and check if password valid
  // fetch from quiz and create quiz object based on api info
  await fetch(`https://mydatabase-c3eb.restdb.io/rest/quiz`, settings)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      initQuizArray(response);
      displayQuizObjects(jsonQuizArray);
    })
    .catch(error => { console.error('Error get request failed:', error); });
}

// put quiz data from json object into jsonquizArray.quizDetails
function initQuizArray(apiObject) {
  let quizCount = apiObject.length;
  console.log("number of quizes " + quizCount)

  for (let i = 0; i < quizCount; i++) {

    var quizExists = jsonQuizArray.filter(obj => {
      return obj.quizid == apiObject[i].quizid
    })

    if (quizExists == false) {
      jsonQuizArray.push({
        "quizid": apiObject[i].quizid,
        "quizimglink": apiObject[i].quizimglink,
        "quizname": apiObject[i].quizname,
        "quizdesc": apiObject[i].quizdesc
      });
    }
  }
}

// it will create and dispay quizzes in the homepage
function displayQuizObjects(jsonObject) {
  var quizCount = jsonObject.length;
  console.log(quizCount);
  var Content = document.getElementById("content");

  for (let i = 0; i < quizCount; i++) {

    // create elements + add classes
    var newQuizDiv = document.createElement("div");
    newQuizDiv.classList.add("quiz-box");

    var newQuizImgDiv = document.createElement("div");
    newQuizImgDiv.classList.add("quiz-box-div");

    var newQuizImg = document.createElement("img");
    console.log(jsonObject[i].quizimglink);

    if (jsonObject[i].quizimglink != null) {
      newQuizImg.src = jsonObject[i].quizimglink;

      // responsive css circular portrait for wide/tall images
      console.log(newQuizImg.height, newQuizImg.width)
      if (newQuizImg.height > newQuizImg.width) {
        newQuizImgDiv.classList.add("centeredvert");
      } else {
        newQuizImgDiv.classList.add("centeredhori")
      }
    }
    else {  
      // ideally will use default img
    }

    // frankenstein them together
    newQuizImg.alt = "Quiz Icon";
    newQuizImgDiv.appendChild(newQuizImg);
    newQuizDiv.appendChild(newQuizImgDiv);

    var newQuizName = document.createElement("h3");
    newQuizName.appendChild(document.createTextNode(jsonObject[i].quizname));
    newQuizDiv.appendChild(newQuizName);

    var newQuizDesc = document.createElement("p");
    newQuizDesc.appendChild(document.createTextNode(jsonObject[i].quizdesc));
    newQuizDiv.appendChild(newQuizDesc);

    Content.appendChild(newQuizDiv);

  }
}

// search function to... search what did u expect?
function searchQuiz() {
  var quizName = document.getElementById("search-bar-input").value;
  var tempJson = { array: [] }
  var quizDetails = jsonQuizArray.quizDetails;

  for (let i = 0; i < quizDetails.length; i++) {
    let name = quizDetails[i].quizname;
    console.log(name.includes(quizName));
    if (name.includes(quizName)) {
      tempJson.array.push({
        "quizid": quizDetails[i].quizid,
        "quizimglink": quizDetails[i].quizimglink,
        "quizname": quizDetails[i].quizname,
        "quizdesc": quizDetails[i].quizdesc
      });
    }
  }
  document.getElementById("content").innerHTML = "";
  displayQuizObjects(tempJson.array)
}

async function getUserRanking(){
  let settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
  }

  if (localStorage.getItem("username") === null) {
    document.getElementById("user-points").innerText = '0'
    document.getElementById("user-rank").innerText = calculateRank(0)
  } else {

    await fetch(`https://mydatabase-c3eb.restdb.io/rest/leaderboards?q={"username":"${Username}"}`, settings)
    .then(response => response.json())
    .then(response => {
      console.log("Leaderboard data for user "+ response);
      var size = Object.keys(response).length
      if (size > 0) {
        document.getElementById("user-points").innerText = response.points;
        document.getElementById("user-rank").innerText = calculateRank(response.points)
      }
    })
    .catch(error => { console.error('Error get request failed:', error); });
  }
}

function calculateRank(points) {
  let rank = 'noobie'
  if (points <= 10) {
    rank = 'Squire'
  } else if (points <= 20) {
    rank = 'Knight'
  } else if (points <= 50) {
    rank = 'Captain'
  }
  return rank;
}
