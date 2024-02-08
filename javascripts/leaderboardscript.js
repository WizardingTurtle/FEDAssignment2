// code idea page
// pull leaderboards then display
// pull last quiz scores then calculate
// update leaderboards, refresh and display


document.addEventListener("DOMContentLoaded", function () {
    const leaderboardList = document.getElementById("leaderboard-list");

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

    // url returns first 20 highest scores
    const apiUrl = `https://firestoredb-a218.restdb.io/rest/leaderboards?sort=score&dir=-1&max=20`; 

    // Initial data for the "All" tab
    updateLeaderboard(apiUrl);

    async function updateLeaderboard(apiUrl) {
        try {
            const response = await fetch(apiUrl, settings);
            const data = await response.json();
            console.log(data);

            // Clear existing leaderboard list
            leaderboardList.innerHTML = "";

            document.getElementById("first-place-score").innerText = data[0].score;
            document.getElementById("first-place-username").innerText = data[0].username;

            document.getElementById("second-place-score").innerText = data[1].score;
            document.getElementById("second-place-username").innerText = data[1].username;

            document.getElementById("third-place-score").innerText = data[2].score;
            document.getElementById("third-place-username").innerText = data[2].username;

            document.getElementById("lottie-loading-home").style.display = "none";
            // Display the top 20 names based on the selected tab
            for (let i = 3; i < Math.min(data.length, 20); i++) {
                const item = data[i];
                console.log(item);
                console.log(item.username);
                console.log(item.score);
                const leaderboardItem = document.createElement("div");
                leaderboardItem.className = "leaderboard-item";

                leaderboardItem.innerHTML = `
                    <div>${i+1}.</div>
                    <div>${item.username}</div>
                    <div>${item.score} points</div>
                `;

                leaderboardList.appendChild(leaderboardItem);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});


function goToHomePage() {
    window.location.assign("../HTML/homepage.html");
}



