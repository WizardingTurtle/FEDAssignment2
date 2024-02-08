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
  if (sessionStorage.getItem('Username') !== null) {
    document.getElementById("usernameHome").innerHTML = sessionStorage.getItem('Username');
  }

  getUserRanking();
  console.log("jsonquiz array has items " + (jsonQuizArray !== null));
  if (jsonQuizArray !== null) {
    displayQuizObjects(jsonQuizArray);
  }
  getQuizObjects();
  setInterval(updateQuizImages, 4000);

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
      document.getElementById("lottie-loading-home").innerHTML = "";
      displayQuizObjects(jsonQuizArray);
    })
    .catch(error => { console.error('Error get request failed:', error); });
}

// put quiz data from json object into jsonquizArray
function initQuizArray(apiObject) {
  var quizCount = apiObject.length;
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

// update image css for all quiz objects
function updateQuizImages() {
  console.log("Update image executed")
  let quizCount = jsonQuizArray.length;
  for (let i = 0; i < quizCount; i++) {
    let imgid = "img-id-" + i
    console.log(imgid);
    let image = document.getElementById(imgid);
    if ((image.naturalHeight > image.naturalWidth && image.parentElement.classList.contains("centeredhori"))) {
      console.log("update ran for img " + i)
      image.parentElement.classList.remove("centeredhori");
      image.parentElement.classList.add("centeredvert");
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
    // clicking on quiz object will send user to quiz page storing quizid
    newQuizDiv.onclick = function () {
      sessionStorage.setItem("quizID", jsonObject[i].quizid);
      sessionStorage.setItem("quizName", jsonObject[i].quizname);
      window.location.assign("../HTML/quizpage.html")
    }

    var newQuizImgDiv = document.createElement("div");
    newQuizImgDiv.classList.add("quiz-box-div");

    var newQuizImg = document.createElement("img");
    newQuizImg.setAttribute("id", "img-id-" + i);
    console.log(jsonObject[i].quizimglink);

    if (jsonObject[i].quizimglink != null) {
      newQuizImg.src = jsonObject[i].quizimglink;

      // responsive css circular portrait for wide/tall images
      if (newQuizImg.naturalHeight > newQuizImg.naturalWidth) {
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

    var newQuizTextDiv = document.createElement("div");

    var newQuizName = document.createElement("h3");
    newQuizName.appendChild(document.createTextNode(jsonObject[i].quizname));
    newQuizTextDiv.appendChild(newQuizName);

    var newQuizDesc = document.createElement("p");
    newQuizDesc.appendChild(document.createTextNode(jsonObject[i].quizdesc));
    newQuizTextDiv.appendChild(newQuizDesc);

    newQuizDiv.appendChild(newQuizTextDiv)
    Content.appendChild(newQuizDiv);

  }
}

// search function to... search what did u expect?
function searchQuiz() {
  let quizName = document.getElementById("search-bar-input").value;
  let tempArray = []
  let quizDetails = jsonQuizArray;

  for (let i = 0; i < quizDetails.length; i++) {
    let name = quizDetails[i].quizname;
    console.log(name.toLowerCase().includes(quizName.toLowerCase()));
    if (name.toLowerCase().includes(quizName.toLowerCase())) {
      tempArray.push({
        "quizid": quizDetails[i].quizid,
        "quizimglink": quizDetails[i].quizimglink,
        "quizname": quizDetails[i].quizname,
        "quizdesc": quizDetails[i].quizdesc
      });
    }
  }
  document.getElementById("content").innerHTML = "";
  displayQuizObjects(tempArray)
}

function getUserRanking() {
  console.log("getting user rank");
  let settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
  }

  console.log(sessionStorage.getItem("Username") === null);
  if (sessionStorage.getItem("Username") === null) {
    document.getElementById("user-points").innerText = '0'
    document.getElementById("user-rank").innerText = calculateRank(0)
  } else {
    var username = sessionStorage.getItem("Username");

    fetch(`https://mydatabase-c3eb.restdb.io/rest/leaderboards?q={"username":"${username}"}`, settings)
      .then(response => response.json())
      .then(response => {
        console.log("Leaderboard data for user " + response);
        var size = Object.keys(response[0]).length
        if (size > 0) {
          document.getElementById("user-points").innerText = response[0].score;
          document.getElementById("user-rank").innerText = calculateRank(response[0].score)
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
    rank = 'Baronet'
  } else {
    rank = 'Master Quizzer'
  }
  return rank;
}

function logout() {
  sessionStorage.clear()
  window.location.replace("../HTML/loginpage.html")
}

function jumpToLeaderboardPage() {
  window.location.assign("../HTML/leaderboardpage.html")
}
