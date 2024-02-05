// code idea page
// pull leaderboards then display
// pull last quiz scores then calculate
// update leaderboards, refresh and display


document.addEventListener("DOMContentLoaded", function () {
    const leaderboardList = document.getElementById("leaderboard-list");

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

            // Sort the data array from highest to lowest score
            data.sort((a, b) => b.score - a.score);

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

                // Use nth-child() to apply color based on ranking
                leaderboardItem.style.backgroundColor = getRankingColor(i + 1);

                leaderboardItem.innerHTML = `
                    <div>${getRankText(i + 1)}</div>
                    <div>${item.score} points</div>
                `;
                leaderboardList.appendChild(leaderboardItem);

                // Update specific place on the leaderboard
                if (i === 0) {
                    document.getElementById("all-time-score").textContent = item.score;
                    document.getElementById("all-time-username").textContent = item.username;
                } else if (i === 1) {
                    document.getElementById("monthly-score").textContent = item.score;
                    document.getElementById("monthly-username").textContent = item.username;
                } else if (i === 2) {
                    document.getElementById("weekly-score").textContent = item.score;
                    document.getElementById("weekly-username").textContent = item.username;
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    /*
    function getRankingColor(rank) {
        switch (rank) {
            case 1:
                return 'gold';
            case 2:
                return '#c0c0c0';
            case 3:
                return '#cd7f32';
            default:
                return '#DBDFE1'; // Default color for other ranks
        }
    }

    function getRankText(rank) {
        switch (rank) {
            case 1:
                return '1st Place';
            case 2:
                return '2nd Place';
            case 3:
                return '3rd Place';
            default:
                return `${rank}th Place`;
        }
    }   
    */
});



