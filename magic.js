// concept as of now and to do
// request quizzes and create objects in homepage for users to click and access quiz
// on click website remembers quizid and moves to quiz page
// quiz page requests quiz info from api using quizid as identifier for query
// after quiz is done, quiz sends score info along with account to restdb
// user can click on leaderboard where it wil jump to a page that will query for leaderboard collection


// API key
const APIKEY = "6593f49e3ea4be628deb6cfa";
getContacts();

//  NOTHING BELOW WORKS - TO BE OVERHAULED

// submit answer/end quiz listener
document.getElementById("quiz-submit").addEventListener("click", function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    // retrieve question data
    let QuizName = document.getElementById("quiz-name").value;
    let Question = document.getElementById("question").value;
    let Option1 = document.getElementById("option1").value;
    let Option2 = document.getElementById("option2").value;
    let Option3 = document.getElementById("option3").value;
    let Option4 = document.getElementById("option4").value;
    let Info = document.getElementById("info").value;

    // Adapted from restdb API
    let jsondata = {
        "name": contactName,
        "studentid": contactStudentID,
        "studentmentor": contactMentor,
        "studentclass": contactClass,
        "studentemail": contactEmail,
        "course": contactCourse 
      };

    // setting setup

    function getContacts(limit = 10, all = true) {

    let settings = {
        method: "GET", //[cher] we will use GET to retrieve info
        headers: {
             "Content-Type": "application/json",
             "x-apikey": APIKEY,
             "Cache-Control": "no-cache"
            },
        }

        fetch("https://mydatabase-c3eb.restdb.io/rest/quiz", settings)
        .then(response => response.json())
        .then(response => {
        let content = "";

        for (var i = 0; i < response.length && i < limit; i++) {
          //console.log(response[i]);
          
          // Using our template literal method using backticks
          // Take note that we can't use += for template literal strings
          // We use ${content} because -> content += content 
          // We want to add on previous content at the same time
          content = `${content}<tr id='${response[i]._id}'>
          <td>${response[i].quizname}</td>
          <td>${response[i].quizid}</td>
          <td>${response[i].quizQA}</td>
          <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td>
          <td><a href='#update-contact-container' class='update' data-id='${response[i]._id}' 
          data-name='${response[i].name}' 
          data-studentid='${response[i].studentid}'
          data-mentor='${response[i].mentor}'
          data-class='${response[i].class}'
          data-email='${response[i].email}' 
          data-course='${response[i].course}'>Update</a></td></tr>`;

        }

        //[STEP 9]: Update our HTML content
        // Let's dump the content into our table body
        document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;

        document.getElementById("total-contacts").innerHTML = response.length;
      });
    }
});