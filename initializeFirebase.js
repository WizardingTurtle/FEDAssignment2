// DONT RUN UNLESS DB IS CLEAR TO AVOID DATA DUPLICATION

let listofquizzes = 
{
    "quizzes": 
    [{
        "quizid": "q01",
        "quizname": "President' Birthdays" ,
        "quizdesc": "Know your president's birthdays? Test your trivia might with this spicy Quizzeria!",
        "quizimglink":"https://i.pinimg.com/564x/d7/5e/69/d75e69ff29dfe76a0d2439ceee4bd1a1.jpg"
    },{
        "quizid": "q02",
        "quizname": "Lamp or metal pole?",
        "quizdesc": "Perceptive? Try your eyes on tricky quiz of IS IT A LAMP OR A METAL POLE!?",
        "quizimglink": "https://i.pinimg.com/564x/c4/45/d4/c445d462e8f8ba816bdff41c0ef6547e.jpg"
    },{
        "quizid": "q03",
        "quizname": "Plant or Zombie?",
        "quizdesc": "Can you differentiate a plant vs a zombie? Hint: their colors are the same :D",
        "quizimglink": "https://i.pinimg.com/564x/0e/10/3e/0e103eb689a396d95a5a144854904421.jpg"
    },{
        "quizid": "q04",
        "quizname": "Ethan Ate King Kong",
        "quizdesc": "How much do you know about this totally fictitious person? Guess and Impress!",
        "quizimglink": "https://i.pinimg.com/564x/41/e0/9a/41e09aa509d54194c1b9c275d3e67485.jpg"
    },{
        "quizid": "q05",
        "quizname": "Sec 3 A Math",
        "quizdesc": "This is straight up just A Math questions from a textbook. But can you still solve them?",
        "quizimglink": "https://i.pinimg.com/564x/9d/60/ac/9d60accdab0891bf995c6c1d299b73fb.jpg"
    },{
        "quizid": "q06",
        "quizname": "Grass",
        "quizdesc": "Facts and Farces about Grass ",
        "quizimglink": "https://i.pinimg.com/564x/a7/e1/30/a7e130c0402ab1edaed214ade81dcd67.jpg"
    }]
}

var firebaseConfig = {

}

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function fireBasePOST() {
    var quizObject = {
        "quizid": "q01",
        "quizname": "President' Birthdays" ,
        "quizdesc": "Know your president's birthdays? Test your trivia might with this spicy Quizzeria!",
        "quizimglink":"https://i.pinimg.com/564x/d7/5e/69/d75e69ff29dfe76a0d2439ceee4bd1a1.jpg"
    }

    let settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(quizObject)
      }

      fetch("https://console.firebase.google.com/project/fedassignment2-48147/firestore/data/~2Fquiz~2Fquizdetails",settings)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => {
        // Handle errors here
        console.error('Error get request failed:', error);
    });
}

fireBasePOST();