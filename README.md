# FEDAssignment2

Our project is focused on making a quiz website with the purpose of entertaining users and testing their trivia knowledge.

## Design Process

Website is designed for all age groups but is mostly focused on the young adult audience (aged 16 to 30)

We want them to use the website as a way to pass the time and maybe even learn something

Thus we decided on a quiz website to challenge user's knowledge on certain topics.

Currently we plan on a fast paced quiz experience to keep the users on their toes.

# User Experience

Users will create an account to login and keep track of their score
They will then see the homepage of the website where they can see the quizzes they want to try and scroll down for more
Upon clicking on a quiz they will have a moment to read the title and brief description of the quiz before jumping straight into timed question sections
Upon completing a quiz they will get points added to their account based on their performance on the quiz (repeating quizes does not stack points)
Users can then look at the leaderboards to see how they fare against other users if they make it to the top 20

## Features

### Existing Features

. Login and Register account feature - keep track of one's progress
. search and choose a quiz feature - find a quiz of their liking
. Logout feature - allow the user to log out of their account
. playing a quiz feature - timed questions sections
. leaderboards feature - compare against other players performances
. profile feature - see user's coins and po

### Features Left to Implement

- js code to update image css in quizpage

Extra features (if time permits)

- Add quiz feature - allow the community to add their own quizzes
- follow profiles feature - allow users to follow other accounts and see their score and quizzes done
- Weekly quiz feature - homepage shows weekly featured quiz
- badges feature - show user accomplishments e.g. (finished first quiz, done 10 quizes, get a full score on a quiz etc.)

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [JQuery](https://jquery.com)
  - The project uses **JQuery** to simplify DOM manipulation.
- [RestDB](https://restdb.io/)
  - The project uses **RestDB** as a NoSQL database backend.
- [Languages]
  - HTML
  - Javascript
- [Postman](https://www.postman.com/)
  - The project uses **Postman** to test fetch requests to **RestDB**.

## Testing

1. Login and register:

   1. Go to the "loginpage.html" page
   2. Try to submit the empty form and verify that an error message about the required fields appears
   3. Try to submit the form with an invalid account and verify that a relevant error message appears
   4. Try to submit the form with all inputs valid and verify on console that form has been submitted.
   5. Upon successful validation user should immediately jump to "homepage.html"
   6. Repeat steps 2-5 at the "registerpage.html" page

2. Homepage (Quizes and profile)

   1. Go to "homepage.html" page
   2. click on all quizzes to see if they all jump to the quiz page with the correct info
   3. click on settings button to see if it jumps to settings page
   4. Try to search for quizes in the search bar and show the quizzes that exist
   5. Ensure that the user can see all the quizzes after emptying the search bar

3. Quizpage (playing a quiz)

   1. Go DIRECTLY to "quizpage.html"
   2. Test if the page kicks you out automatically if no quizid is stored in storagesession
   3. Go to "quizpage.html" from "homepage.html" with account logged in
   4. Ensure user cannot start the quiz until the quizdata has been fetched (block the option with lottie loading animation)
   4. Play the quiz and ensure all buttons respond correctly (e.g. highlight green for correct answer when click and higlight red for wrong answer)
   5. When quiz has ended - check console to see if the fetch requests to update/post data have run successfuly
   6. Ensure user sees prompt to not close the page while the fetch requests are running
   7. Repeat steps 3-6 without an account logged in (for future guest user testing)

4. LeaderboardPage (see other users score)

  1. Go to "leaderboardpage.html"
  2. Ensure that the page has a lottie animation loading before hiding it after leaderboard statistics are loaded
  3. Ensure user can scroll through the list
  4. Test the exit to homepage button

5. index
  1. Go to index.html
  2. Ensure that the page REPLACES window location to "loginpage.html"


### Mobile Responsiveness
Most notable changes was to the homepage and quizpage 

homepage.html
Quiz objects were rotated to be vertical (Image at the top following down with Title and text)
Greetings bar was moved from linear formation to a upside down pyramid format (greeting, image then user name)

quizpage.html
width of info boxes and question boxes were significantly decreased and text was squeezed to fit within the phone screen dimensions
question text was significantly decreased in size

### Fun bugs/problems Emmanuel found (not in order)

- Javascript can run fetch functions and SKIP waiting for the fetch to return a response to execute other functions which can result in code dependent on fetch responses to break and the whole website to come to a full halt
  - *Solution*: put normal functions / fetch statements that require previous fetch responses INSIDE the fetch .then() clause
- Images grabbed from online links and displayed in the homepage.html (RESTDB pay walled getting images so links of the images were stored instead) would not render immediately at the start of the page and thus will make js code that appends the respective css to the image useless
  - *Solution*: added a function that does a update every 4 seconds to check each images' natural heights and widths after they have been rendered and replaces the respective css it would need to render properly
- RESTDB will automatically block requests for long periods of time after too many requests are sent which makes the whole website useless
  - *Solution*: fetches for all pages usually occur only once or twice to avoid request spam and session storage is used to store known RESTDB info to avoid unecessary fetching
- Entering the quizpage without a stored quizID will immediately result in the quiz page breaking as a quizid stored in session is required to pull quiz data
  - *Solution*: Immediately kick the user back to homepage if the quizid does not exist in storage
- RESTDB may sometimes not have fully initialized the settings and fields of a collection after construction which can cause fetch requests to fail
  - *Solution*: cry and wait for about 20 mins before running a fetch request from Postman to see if it api is accessible

## Credits

### Content

- All text content was imagined up
- Exception for the quiz "Presidents' Birthdays" which the birthdays were found from a quick google search

### Media

All photos used are from Pinterest

### Acknowledgements

Inspired by these websites:
- [https://quizizz.com/]
- [https://kahoot.com/]
