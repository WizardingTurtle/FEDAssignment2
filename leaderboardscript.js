document.addEventListener("DOMContentLoaded", function () {
    const leaderboardList = document.getElementById("leaderboard-list");

    // placeholder data
    const apiUrl = 'YOUR_RESTDB_API_ENDPOINT'; // replace with the api endpoint

    // Initial data for the "All" tab
    updateLeaderboard(apiUrl + '/all');

    async function updateLeaderboard(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Sort the data array from highest to lowest score
            data.sort((a, b) => b.score - a.score);

            // Clear existing leaderboard list
            leaderboardList.innerHTML = "";

            // Display the top 20 names based on the selected tab
            for (let i = 0; i < Math.min(data.length, 20); i++) {
                const item = data[i];
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
});