
// Sample collection data for testing

let collections = [
    {
        id: 001,
        donor: "Fresh Foods Supermarket",
        food: "Fresh Vegetables",
        quantity: 25,
        date: "2026-11-10",
        volunteer: "John Smith",
        status: "Pending"
    },
    {
        id: 002,
        donor: "City Bakery",
        food: "Bread and Pastries",
        quantity: 15,
        date: "2026-11-11",
        volunteer: "Sarah Jones",
        status: "In Progress"
    },
    {
        id: 003,
        donor: "Green Cafe",
        food: "Sandwiches",
        quantity: 10,
        date: "2026-11-08",
        volunteer: "David Brown",
        status: "Completed"
    },
    {
        id: 004,
        donor: "Local Supermarket",
        food: "Dairy Products",
        quantity: 20,
        date: "2026-11-12",
        volunteer: "Not Assigned",
        status: "Pending"
    }
];

// Display collection records
function displayCollections(list) {

    const table = document.getElementById("collectionTable");

    table.innerHTML = "";

    document.getElementById("emptyCollections")
        .classList.toggle("hidden", list.length !== 0);

    list.forEach(collection => {

        const row = document.createElement("tr");
        row.className = "border-b";

        const values = [
            collection.donor,
            collection.food,
            collection.quantity + " kg",
            collection.date,
            collection.volunteer,
            collection.status
        ];

        values.forEach(value => {

            const cell = document.createElement("td");
            cell.className = "p-4";
            cell.textContent = value;

            row.appendChild(cell);
        });

        // Status update button
        const actionCell = document.createElement("td");
        actionCell.className = "p-4";

        const button = document.createElement("button");

        button.textContent = "Update Status";
        button.dataset.id = collection.id;

        button.className =
            "bg-green-700 text-white px-3 py-2 rounded";

        actionCell.appendChild(button);
        row.appendChild(actionCell);

        table.appendChild(row);
    });

    updateCollectionStatistics();
}

// Update collection statistics
function updateCollectionStatistics() {

    document.getElementById("totalCollections").textContent =
        collections.length;

    document.getElementById("pendingCollections").textContent =
        collections.filter(c => c.status === "Pending").length;

    document.getElementById("completedCollections").textContent =
        collections.filter(c => c.status === "Completed").length;
}

// Search and filter collections
function filterCollections() {

    const search = document
        .getElementById("searchCollection")
        .value.toLowerCase();

    const status = document
        .getElementById("statusFilter").value;

    const filtered = collections.filter(collection => {

        const matchesSearch =
            collection.donor.toLowerCase().includes(search) ||
            collection.food.toLowerCase().includes(search);

        const matchesStatus =
            status === "All" || collection.status === status;

        return matchesSearch && matchesStatus;
    });

    displayCollections(filtered);
}

// Update collection status
document.getElementById("collectionTable")
    .addEventListener("click", function(event) {

        const button = event.target.closest("button[data-id]");

        if (!button) return;

        const id = Number(button.dataset.id);

        const collection = collections.find(c => c.id === id);

        if (!collection) return;

        const statuses = [
            "Pending",
            "In Progress",
            "Completed"
        ];

        const currentIndex =
            statuses.indexOf(collection.status);

        const nextStatus =
            statuses[(currentIndex + 1) % statuses.length];

        collection.status = nextStatus;

        filterCollections();
    });

// Event listeners
document.getElementById("searchCollection")
    .addEventListener("input", filterCollections);

document.getElementById("statusFilter")
    .addEventListener("change", filterCollections);

// Initial display
displayCollections(collections);
