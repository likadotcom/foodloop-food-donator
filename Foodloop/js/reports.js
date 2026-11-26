
// Sample charity report data

const reportData = {

    foodSaved: 1250,

    completed: 48,

    pending: 12,

    users: 86,

    monthlyFood: [
        { month: "Jan", amount: 120 },
        { month: "Feb", amount: 150 },
        { month: "Mar", amount: 180 },
        { month: "Apr", amount: 140 },
        { month: "May", amount: 220 },
        { month: "Jun", amount: 260 },
        { month: "Jul", amount: 180 }
    ]

};

// Display main statistics
function displayReports() {

    document.getElementById("foodSaved").textContent =
        reportData.foodSaved + " kg";

    document.getElementById("completed").textContent =
        reportData.completed;

    document.getElementById("pending").textContent =
        reportData.pending;

    document.getElementById("users").textContent =
        reportData.users;

    displayMonthlyChart();

    displayCollectionPerformance();

    displaySummary();
}

// Generate monthly food chart
function displayMonthlyChart() {

    const chart = document.getElementById("monthlyChart");

    chart.innerHTML = "";

    const maximum = Math.max(
        ...reportData.monthlyFood.map(item => item.amount)
    );

    reportData.monthlyFood.forEach(item => {

        const column = document.createElement("div");

        column.className =
            "flex-1 flex flex-col items-center justify-end h-full";

        const amount = document.createElement("span");

        amount.textContent = item.amount + " kg";
        amount.className = "text-xs text-gray-600 mb-2";

        const bar = document.createElement("div");

        const height = (item.amount / maximum) * 75;

        bar.style.height = height + "%";
        bar.style.width = "70%";
        bar.className = "bg-green-600 rounded-t-lg";

        const label = document.createElement("span");

        label.textContent = item.month;
        label.className = "text-sm mt-2 mb-2";

        column.append(amount, bar, label);

        chart.appendChild(column);
    });
}

// Calculate collection performance
function displayCollectionPerformance() {

    const total =
        reportData.completed + reportData.pending;

    const completedPercentage =
        total > 0
            ? Math.round((reportData.completed / total) * 100)
            : 0;

    const pendingPercentage =
        total > 0
            ? Math.round((reportData.pending / total) * 100)
            : 0;

    document.getElementById("completedPercentage")
        .textContent = completedPercentage + "%";

    document.getElementById("pendingPercentage")
        .textContent = pendingPercentage + "%";

    document.getElementById("completedBar")
        .style.width = completedPercentage + "%";

    document.getElementById("pendingBar")
        .style.width = pendingPercentage + "%";
}

// Generate charity performance summary
function displaySummary() {

    const total =
        reportData.completed + reportData.pending;

    const summary =
        "FoodLoop has redistributed " +
        reportData.foodSaved +
        " kg of surplus food. A total of " +
        reportData.completed +
        " collections have been completed, while " +
        reportData.pending +
        " collections are still pending. The platform currently " +
        "has " + reportData.users +
        " registered users and a total of " +
        total + " recorded collections.";

    document.getElementById("reportSummary")
        .textContent = summary;
}

// Print report
document.getElementById("printReport")
    .addEventListener("click", () => {

        window.print();

    });

// Load report information
displayReports();
