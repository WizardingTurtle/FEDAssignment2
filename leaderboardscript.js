document.addEventListener("DOMContentLoaded", function () {
    // Initial data for demonstration purposes
    const allTimeData = [
        { username: "User1", score: 1000 },
        { username: "User2", score: 950 },
        { username: "User3", score: 900 }
    ];

    const monthlyData = [
        { username: "User4", score: 500 },
        { username: "User5", score: 480 },
        { username: "User6", score: 450 }
    ];

    const weeklyData = [
        { username: "User7", score: 200 },
        { username: "User8", score: 180 },
        { username: "User9", score: 150 }
    ];

    const leaderboardList = document.getElementById("leaderboard-list");
    const allTimeTab = document.querySelector(".leaderboard-tab:nth-child(1)");
    const monthlyTab = document.querySelector(".leaderboard-tab:nth-child(2)");
    const weeklyTab = document.querySelector(".leaderboard-tab:nth-child(3)");

    // Initial data for the "All" tab
    updateLeaderboard(allTimeData);

    allTimeTab.addEventListener("click", function () {
        updateLeaderboard(allTimeData);
        setActiveTab(allTimeTab);
    });

    monthlyTab.addEventListener("click", function () {
        updateLeaderboard(monthlyData);
        setActiveTab(monthlyTab);
    });

    weeklyTab.addEventListener("click", function () {
        updateLeaderboard(weeklyData);
        setActiveTab(weeklyTab);
    });

    function updateLeaderboard(data) {
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