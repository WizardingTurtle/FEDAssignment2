// code for login page 
// idea - request data from restdb and check if account is valid 
// if correct - show homepage using selected profile 
document.addEventListener("DOMContentLoaded", setupLogin); 
 
// functions 
// stop submit from refreshing 
const subform = document.getElementById("loginbtn"); 
subform.addEventListener("click", submitFormReturn, false) 
 
function submitFormReturn(event) { 
  verifyLogin(); 
  event.preventDefault(); 
} 
 
// Initialize page function 
function setupLogin() { 
  hideMe(); 
  const loginButton = document.getElementById("loginbtn"); 
  loginButton.addEventListener("click", showAnimation); 
} 
 
// hide alerts function 
function hideMe() { 
  document.getElementById("add-update-msg").style.display = "none"; 
  document.getElementById("lottie-loading-home").innerHTML = ""; 
} 
 
// show animation function 
function showAnimation() { 
  document.getElementById("lottie-loading-home").innerHTML = ` 
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script> 
    <lottie-player  
        src="https://lottie.host/39027a3c-0413-4086-9fa5-687aed7344b8/U4LWfxonGw.json"   
        speed="1"  
        style="width: 10vw; min-height: 10vh"  
        loop 
        autoplay  
        direction="1"  
        mode="normal"> 
    </lottie-player>`; 
} 
 
 
// validate account function 
function validateAccount(DBpassword, Password) { 
 
  if (DBpassword == Password) { 
    // store user credentials in session storage to make pulling info easier 
    sessionStorage.setItem('Username', document.getElementById("username").value); 
    window.location.assign("../HTML/homepage.html") 
    //ideally will remember login credentials throughout the website 
  } 
  else { 
    document.getElementById("add-update-msg").innerText = "LOGIN FAILED: Incorrect Password"; 
    document.getElementById("add-update-msg").style.display = "inline"; 
    // Clear the loading animation 
    document.getElementById("lottie-loading-home").innerHTML = ""; 
  } 
} 
 
// verify account details function - uses GET request 
function verifyLogin() { 
  document.getElementById("add-update-msg").style.display = "none"; 
 
  let Username = document.getElementById("username").value; 
  let Password = document.getElementById("password").value; 
 
  // if either conditions occur stop function to avoid unecessary api calls 
  if (Username.length < 2) { 
    document.getElementById("add-update-msg").innerText = "LOGIN FAILED: Invalid Username"; 
    document.getElementById("add-update-msg").style.display = "inline"; 
    // Clear the loading animation 
    document.getElementById("lottie-loading-home").innerHTML = ""; 
    return; 
  } else if (Password.length < 3) { 
    document.getElementById("add-update-msg").innerText = "LOGIN FAILED: Invalid Password"; 
    document.getElementById("add-update-msg").style.display = "inline"; 
    // Clear the loading animation 
    document.getElementById("lottie-loading-home").innerHTML = ""; 
    return; 
  }  
 
  console.log(Username); 
 
 
  // initilize settings for GET request 
 
  // API key 
  const APIKEY = "65c099ce00d3da1e0863a2dd"; 
 
  let settings = { 
    method: 'GET', 
    headers: { 
      'Content-Type': 'application/json', 
      "x-apikey": APIKEY, 
      "Cache-Control": "no-cache" 
    }, 
  } 
 
  // fetch data and check if password valid 
  fetch(`https://firestoredb-a218.restdb.io/rest/account?q={"username":"${Username}"}`, settings) 
    .then(response => response.json()) 
    .then(response => { 
      // Handle the JSON data here 
      console.log(response); 
      var size = Object.keys(response).length 
      if (size > 0) { 
        validateAccount(response[0].password, Password); 
      } 
      else { 
        document.getElementById("add-update-msg").innerText = "LOGIN FAILED: Account does not exist"; 
        document.getElementById("add-update-msg").style.display = "inline"; 
        // Clear the loading animation 
        document.getElementById("lottie-loading-home").innerHTML = ""; 
      } 
    }) 
    .catch(error => { 
      // Handle errors here 
      console.error('Error get request failed:', error);
      document.getElementById("add-update-msg").innerText = "GET REQUEST FAILED MISERABLY"; 
      document.getElementById("add-update-msg").style.display = "inline"; 
      // Clear the loading animation 
      document.getElementById("lottie-loading-home").innerHTML = ""; 
    }); 
}