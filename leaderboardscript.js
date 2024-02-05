// code idea page
// pull leaderboards then display
// pull last quiz scores then calculate
// update leaderboards, refresh and display


document.addEventListener("DOMContentLoaded", function () {
    const leaderboardList = document.getElementById("leaderboard-list");
    const allTimeTab = document.querySelector(".leaderboard-tab:nth-child(1)");

    const monthlyTab = document.querySelector(".leaderboard-tab:nth-child(2)");
    const weeklyTab = document.querySelector(".leaderboard-tab:nth-child(3)");

    // initilize settings for GET request
    // API key
    const APIKEY = "6593f49e3ea4be628deb6cfa";

    let settings = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
        },
    }

    // url returns first 20 highest scores
    const apiUrl = `https://mydatabase-c3eb.restdb.io/rest/leaderboards?sort=score&dir=-1&max=20`; 

    // Initial data for the "All" tab
    updateLeaderboard(apiUrl);

    allTimeTab.addEventListener("click", function () {
        updateLeaderboard(apiUrl);
        setActiveTab(allTimeTab);
    });

    /*
    monthlyTab.addEventListener("click", function () {
        updateLeaderboard(apiUrl + '/month');
        setActiveTab(monthlyTab);
    });

    weeklyTab.addEventListener("click", function () {
        updateLeaderboard(apiUrl + '/week');
        setActiveTab(weeklyTab);
    });
    */
   
    async function updateLeaderboard(apiUrl) {
        try {
            const response = await fetch(apiUrl, settings);
            const data = await response.json();

            // Clear existing leaderboard list
            leaderboardList.innerHTML = "";

            document.getElementById("first-place-score").innerText = data[0].score;
            document.getElementById("first-place-username").innerText = data[0].username;

            document.getElementById("second-place-score").innerText = data[1].score;
            document.getElementById("second-place-username").innerText = data[1].username;

            document.getElementById("third-place-score").innerText = data[1].score;
            document.getElementById("third-place-username").innerText = data[1].username;

            // Display the top 20 names based on the selected tab
            for (let i = 3; i < Math.min(data.length, 20); i++) {
                const item = data[i];
                console.log(item);
                console.log(item.username);
                console.log(item.score);
                const leaderboardItem = document.createElement("div");
                leaderboardItem.className = "leaderboard-item";
                leaderboardItem.innerHTML = `
                    <div>${i + 1}. ${item.username}</div>
                    <div>${item.score} points</div>
                `;
                leaderboardList.appendChild(leaderboardItem);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    /*
    function setActiveTab(tabElement) {
        // Remove active class from all tabs
        document.querySelectorAll(".leaderboard-tab").forEach(tab => {
            tab.classList.remove("active");
        });

        // Add active class to the selected tab
        tabElement.classList.add("active");
    }   
    */
});



