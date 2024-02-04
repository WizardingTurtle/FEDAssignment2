document.addEventListener("DOMContentLoaded", function () {
    const leaderboardList = document.getElementById("leaderboard-list");
    const allTimeTab = document.querySelector(".leaderboard-tab:nth-child(1)");
    const monthlyTab = document.querySelector(".leaderboard-tab:nth-child(2)");
    const weeklyTab = document.querySelector(".leaderboard-tab:nth-child(3)");

    // placeholder data
    const apiUrl = 'YOUR_RESTDB_API_ENDPOINT'; // replace with the api endpoint

    // Initial data for the "All" tab
    updateLeaderboard(apiUrl + '/all');

    allTimeTab.addEventListener("click", function () {
        updateLeaderboard(apiUrl + '/all');
        setActiveTab(allTimeTab);
    });

    monthlyTab.addEventListener("click", function () {
        updateLeaderboard(apiUrl + '/month');
        setActiveTab(monthlyTab);
    });

    weeklyTab.addEventListener("click", function () {
        updateLeaderboard(apiUrl + '/week');
        setActiveTab(weeklyTab);
    });

    async function updateLeaderboard(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Clear existing leaderboard list
            leaderboardList.innerHTML = "";

            // Display the top 20 names based on the selected tab
            for (let i = 0; i < Math.min(data.length, 20); i++) {
                const item = data[i];
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

    function setActiveTab(tabElement) {
        // Remove active class from all tabs
        document.querySelectorAll(".leaderboard-tab").forEach(tab => {
            tab.classList.remove("active");
        });

        // Add active class to the selected tab
        tabElement.classList.add("active");
    }
});