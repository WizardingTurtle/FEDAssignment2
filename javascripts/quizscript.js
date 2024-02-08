//API Key
const APIKEY = "6593f49e3ea4be628deb6cfa";
// QuizArray
var questions = [];


//select the needed elements
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left");
const timeCount = document.querySelector(".timer .timer_sec");
const progressBar = document.querySelector(".progress-container")

// Hiding the timer initially
timeCount.style.display = "none";
progressBar.style.display = "none";

info_box.classList.add("activeInfo");

// if exit button clicked
exit_btn.onclick = () => {
    window.location.href = "homepage.html";
}

// if continue button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0);
    questionCounter(1);
    startTimer(19);
    startTimerLine(0);
    setInterval(updateQuizImage(), 2000);
}

let timeValue = 20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restart button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 20;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    questionCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    next_btn.classList.remove("show");
    setInterval(updateQuizImage(), 2000);

    // Reset progress bar
    resetProgressBar();
}

// if quit button clicked
quit_quiz.onclick = () => {
    window.location.href = "homepage.html";
}

const next_btn = document.querySelector(".quiznext .next_btn");
const total_question_counter = document.querySelector(".total_que");

// if next button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        questionCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        // Update the progress bar
        updateProgressBar();
        next_btn.classList.remove("show");
        setInterval(updateQuizImage(), 2000);
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
        updateProgressBar();
    }
}

// Function to randomize quiz options
function randomizeOptions(options) {
    return options.sort(() => Math.random() - 0.5);
}

// Function updates image
function updateQuizImage() {
    console.log("Update image executed")
    let image = document.getElementById("qnImg");
    console.log(image.src)
    if ((image.naturalHeight > image.naturalWidth && image.parentElement.classList.contains("centeredhori"))) {
        console.log("update ran for img ")
        image.parentElement.classList.remove("centeredhori");
        image.parentElement.classList.add("centeredvert");
    }
}

// getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';

    const randomizedOptions = randomizeOptions(questions[index].options);

    let option_tag = '<div class="option"><span>' + randomizedOptions[0] + '</span></div>'
        + '<div class="option"><span>' + randomizedOptions[1] + '</span></div>'
        + '<div class="option"><span>' + randomizedOptions[2] + '</span></div>'
        + '<div class="option"><span>' + randomizedOptions[3] + '</span></div>';


    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    document.getElementById("qnImg").src = `${questions[index].imglink}`;

    //show timer and progress bar
    timeCount.style.display = "flex";
    progressBar.style.display = "flex";

    const option = option_list.querySelectorAll(".option");

    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// the icons for correct and wrong options
let tickIconTag = '<div class="icon tick"><img src="../images/checked.png" alt="User Icon" id="user-icon"></div>';
let crossIconTag = '<div class="icon cross"><img src="../images/cancel.png" alt="User Icon" id="user-icon"></div>';

//if user clicks an option
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if (userAns == correcAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    timeCount.style.display = "none";
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) { // if user scores more than 3 points

        let scoreTag = '<span><p>' + userScore + '</p> / <p>' + questions.length + '</p>, Well Done!</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1) { // if user scores more than 1 point
        let scoreTag = '<span><p>' + userScore + '</p> / <p>' + questions.length + '</p>, Try Again Next Time!</span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scores 0 points
        let scoreTag = '<span><p>' + userScore + '</p> / <p>' + questions.length + ', Try Again Next Time!</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    updateQuizScore();
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 38);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function questionCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    total_question_counter.innerHTML = totalQueCounTag;
}

function updateProgressBar() {
    widthValue += 100 / questions.length; // Calculate the width value based on the total number of questions
    progress.style.width = widthValue + '%';
}

function resetProgressBar() {
    const progressBar = document.getElementById('progress');
    progressBar.style.width = '0%';
}

function quitQuiz() {
    window.location.href = "homepage.html";
}

//for restdb, implementing features; change here first then copy paste to the top
async function initializeQuizData() {
    if (sessionStorage.getItem("quizID") === null) {
        // return user to homepage after 2-3 seconds since quiz does not exist
        window.location.replace("../HTML/homepage.html");
    } else {
        var quizid = sessionStorage.getItem("quizID");
    }
    console.log(quizid);
    // init get fetch request for quiz

    let settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    fetch(`https://mydatabase-c3eb.restdb.io/rest/quizquestions?q={"quizid":"${quizid}"}`, settings)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            questions = response[0].quizquestions;
            console.log(questions)
            document.getElementById("placeholder-title").innerText = sessionStorage.getItem("quizName");
            document.getElementById("lottie-loading").style.display = "none";
        })
        .catch(error => {
            // Handle errors here
            console.error('Error fetching quiz data:', error);
        });
}

// Call initializeQuizData to fetch quiz questions from the API
initializeQuizData();

// Function to post score to DB
function updateQuizScore() {
    if (sessionStorage.getItem("Username") === null || sessionStorage.getItem("quizID") === null) {
        console.log("updateQuizScore cancelled - session has either no quiz id or username")
        return;
    } else {
        var quizid = sessionStorage.getItem("quizID");
        var username = sessionStorage.getItem("Username");
        console.log(quizid + typeof (quizid));
        console.log(username + typeof (username));
    }
    document.getElementById("loading-text").innerText = "Posting Score to RESTDB";
    document.getElementById("lottie-loading").style.display = "inline";

    let settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    fetch(`https://mydatabase-c3eb.restdb.io/rest/quizscores?q={"quizid":"${quizid}","username":"${username}"}`, settings)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            var size = Object.keys(response).length
            // if it exists - update score
            // else post new data
            if (size > 0) {
                var fieldid = response[0]._id
                console.log(response[0]._id);

                let jsondata = {
                    "score": userScore
                }

                let settings = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache"
                    },
                    body: JSON.stringify(jsondata),
                }

                fetch(`https://mydatabase-c3eb.restdb.io/rest/quizscores/${fieldid}`, settings)
                    .then(updateLeaderboard())
                    .catch(error => {
                        // Handle errors here
                        console.error('Error fetching Patch quizscores data:', error);
                    });
            } else {
                let jsondata = {
                    "score": userScore,
                    "username": username,
                    "quizid": quizid,
                }

                let settings = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache"
                    },
                    body: JSON.stringify(jsondata),
                }

                fetch(`https://mydatabase-c3eb.restdb.io/rest/quizscores`, settings)
                    .then(updateLeaderboard())
                    .catch(error => {
                        // Handle errors here
                        console.error('Error fetching Post quizscores data:', error);
                    });
            }
        })
        .catch(error => {
            // Handle errors here
            console.error('Error fetching quizscores data:', error);
        });
}

function updateLeaderboard() {
    if (sessionStorage.getItem("Username") === null || sessionStorage.getItem("quizID") === null) {
        console.log("updateLeaderboard cancelled - session has either no quiz id or username")
        return;
    } else {
        var username = sessionStorage.getItem("Username");
    }
    var leaderboardScore = 0;
    document.getElementById("loading-text").innerText = "Updating Leaderboard please don't close the window";

    let settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    fetch(`https://mydatabase-c3eb.restdb.io/rest/quizscores?q={"username":"${username}"}`, settings)
        .then(response => response.json())
        .then(response => {
            var size = response.length
            if (size > 0) {
                for (let i = 0; i < size; i++) {
                    leaderboardScore += response[i].score;
                    console.log(leaderboardScore);
                }

                let settings = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "x-apikey": APIKEY,
                        "Cache-Control": "no-cache"
                    },
                }

                fetch(`https://mydatabase-c3eb.restdb.io/rest/leaderboards?q={"username":"${username}"}`, settings)
                    .then(response => response.json())
                    .then(response => {
                        var size = response.length
                        if (size > 0) {
                            var fieldid = response[0]._id
                            let jsondata = {
                                "score": leaderboardScore
                            }

                            let settings = {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    "x-apikey": APIKEY,
                                    "Cache-Control": "no-cache"
                                },
                                body: JSON.stringify(jsondata),
                            }

                            fetch(`https://mydatabase-c3eb.restdb.io/rest/leaderboards/${fieldid}`, settings)
                                .then(document.getElementById("lottie-loading").style.display = "none")
                        } else {
                            let jsondata = {
                                "score": leaderboardScore,
                                "username": username
                            }

                            let settings = {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    "x-apikey": APIKEY,
                                    "Cache-Control": "no-cache"
                                },
                                body: JSON.stringify(jsondata),
                            }

                            fetch(`https://mydatabase-c3eb.restdb.io/rest/leaderboards`, settings)
                                .then(document.getElementById("lottie-loading").style.display = "none")
                                .catch(error => {
                                    // Handle errors here
                                    console.error('Error fetching Post quizscores data:', error);
                                });
                        }
                    })
            }
        })
}