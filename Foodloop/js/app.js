
async function loadDashboard() {

    try {

        const response = await fetch("/api/reports");
        const data = await response.json();

        document.getElementById("foodSaved").textContent =
            data.foodSaved + " kg";

        document.getElementById("completed").textContent =
            data.completed;

        document.getElementById("pending").textContent =
            data.pending;

        document.getElementById("users").textContent =
            data.users;

    } catch (error) {
        console.error("Dashboard error:", error);
    }
}

loadDashboard();