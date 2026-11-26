
// FoodLoop Customer Dashboard
// Prototype data for demonstration purposes

let donations = [
    {
        id: 1,
        donor: "Fresh Foods Supermarket",
        food: "Fresh Vegetables",
        quantity: 25,
        date: "2026-11-10",
        time: "10:00",
        safety: "Keep refrigerated. Contains no declared allergens.",
        status: "Available"
    },
    {
        id: 2,
        donor: "City Bakery",
        food: "Bread and Pastries",
        quantity: 15,
        date: "2026-11-11",
        time: "12:00",
        safety: "Contains wheat and gluten.",
        status: "Available"
    },
    {
        id: 3,
        donor: "Green Cafe",
        food: "Prepared Sandwiches",
        quantity: 10,
        date: "2026-11-12",
        time: "14:00",
        safety: "Contains dairy. Keep chilled.",
        status: "Available"
    }
];

// Collection activity for the demo customer
let activities = [];

// Volunteer collection requests
let volunteerRequests = [
    {
        id: 1,
        food: "Fresh Vegetables",
        donor: "Fresh Foods Supermarket",
        destination: "Nottingham Community Kitchen",
        date: "2026-11-10",
        status: "Available"
    },
    {
        id: 2,
        food: "Bread and Pastries",
        donor: "City Bakery",
        destination: "Helping Hands Food Bank",
        date: "2026-11-11",
        status: "Available"
    }
];

// Get page elements
const roleSelect = document.getElementById("userRole");

const recipientSection =
    document.getElementById("recipientSection");

const donorSection =
    document.getElementById("donorSection");

const volunteerSection =
    document.getElementById("volunteerSection");

// Change dashboard according to customer role
function changeDashboard() {

    const role = roleSelect.value;

    recipientSection.classList.add("hidden");
    donorSection.classList.add("hidden");
    volunteerSection.classList.add("hidden");

    if (role === "Recipient") {

        recipientSection.classList.remove("hidden");

        document.getElementById("welcomeName").textContent =
            "Welcome, Recipient Organisation!";

    } else if (role === "Donor") {

        donorSection.classList.remove("hidden");

        document.getElementById("welcomeName").textContent =
            "Welcome, Food Donor!";

    } else if (role === "Volunteer") {

        volunteerSection.classList.remove("hidden");

        document.getElementById("welcomeName").textContent =
            "Welcome, Volunteer Driver!";
    }

    displayDonations();
    displayMyDonations();
    displayVolunteerRequests();
    displayActivity();
    updateStatistics();
}

// Display available donations
function displayDonations() {

    const list = document.getElementById("donationList");

    list.innerHTML = "";

    const search = document.getElementById("searchFood")
        .value.toLowerCase();

    const filtered = donations.filter(donation => {

        return donation.status === "Available" &&
            (
                donation.food.toLowerCase().includes(search) ||
                donation.donor.toLowerCase().includes(search)
            );
    });

    if (filtered.length === 0) {

        list.textContent = "No available food donations found.";
        return;
    }

    filtered.forEach(donation => {

        const card = document.createElement("div");

        card.className =
            "bg-white p-5 rounded-xl shadow";

        const heading = document.createElement("h4");
        heading.className = "text-xl font-bold text-green-800";
        heading.textContent = donation.food;

        const donor = document.createElement("p");
        donor.className = "text-gray-600 mt-2";
        donor.textContent = "Donor: " + donation.donor;

        const quantity = document.createElement("p");
        quantity.textContent =
            "Quantity: " + donation.quantity + " kg";

        const date = document.createElement("p");
        date.textContent =
            "Collection date: " + donation.date;

        const time = document.createElement("p");
        time.textContent =
            "Collection time: " + donation.time;

        const safety = document.createElement("p");
        safety.className = "text-sm text-gray-600 mt-2";
        safety.textContent =
            "Food safety: " + donation.safety;

        const button = document.createElement("button");

        button.textContent = "Claim Donation";
        button.dataset.id = donation.id;

        button.className =
            "bg-green-700 text-white px-4 py-2 rounded-lg mt-4";

        card.append(
            heading,
            donor,
            quantity,
            date,
            time,
            safety,
            button
        );

        list.appendChild(card);
    });
}

// Claim a food donation
document.getElementById("donationList")
    .addEventListener("click", function(event) {

        const button = event.target.closest("button[data-id]");

        if (!button) return;

        const id = Number(button.dataset.id);

        const donation = donations.find(
            item => item.id === id
        );

        if (!donation || donation.status !== "Available") {
            return;
        }

        donation.status = "Claimed";

        activities.push({
            description: "Claimed " + donation.food,
            status: "Claimed"
        });

        displayDonations();
        displayActivity();
        updateStatistics();

        alert("Donation claimed successfully!");
    });

// Display donor's own donations
function displayMyDonations() {

    const list = document.getElementById("myDonations");

    list.innerHTML = "";

    donations
        .filter(donation =>
            donation.donor === "My Organisation"
        )
        .forEach(donation => {

            const card = document.createElement("div");

            card.className =
                "bg-white p-5 rounded-xl shadow";

            const title = document.createElement("h4");
            title.className = "font-bold text-lg";
            title.textContent = donation.food;

            const quantity = document.createElement("p");
            quantity.textContent =
                "Quantity: " + donation.quantity + " kg";

            const status = document.createElement("p");
            status.textContent =
                "Status: " + donation.status;

            card.append(title, quantity, status);

            list.appendChild(card);
        });

    if (list.children.length === 0) {

        list.textContent = "You have not published any donations yet.";
    }
}

// Publish a new donation
document.getElementById("donationForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const food = document.getElementById("foodName")
            .value.trim();

        const quantity = Number(
            document.getElementById("foodQuantity").value
        );

        const date = document.getElementById("collectionDate")
            .value;

        const time = document.getElementById("collectionTime")
            .value;

        const safety = document.getElementById("foodSafety")
            .value.trim();

        if (!food || !safety || quantity <= 0 || !date || !time) {
            return;
        }

        if (date < new Date().toLocaleDateString("en-CA")) {

            document.getElementById("donationMessage")
                .textContent = "Please select a future collection date.";

            return;
        }

        const newDonation = {

            id: Date.now(),
            donor: "My Organisation",
            food: food,
            quantity: quantity,
            date: date,
            time: time,
            safety: safety,
            status: "Available"
        };

        donations.push(newDonation);

        this.reset();

        document.getElementById("donationMessage")
            .textContent = "Donation published successfully!";

        displayMyDonations();
        displayDonations();
        updateStatistics();
    });

// Display volunteer collection requests
function displayVolunteerRequests() {

    const list = document.getElementById("volunteerList");

    list.innerHTML = "";

    const available = volunteerRequests.filter(
        request => request.status === "Available"
    );

    if (available.length === 0) {

        list.textContent = "No available collection requests.";
        return;
    }

    available.forEach(request => {

        const card = document.createElement("div");

        card.className =
            "bg-white p-5 rounded-xl shadow";

        const title = document.createElement("h4");

        title.className = "text-xl font-bold text-green-800";
        title.textContent = request.food;

        const donor = document.createElement("p");
        donor.textContent = "Pickup: " + request.donor;

        const destination = document.createElement("p");
        destination.textContent =
            "Destination: " + request.destination;

        const date = document.createElement("p");
        date.textContent = "Date: " + request.date;

        const button = document.createElement("button");

        button.textContent = "Accept Collection";
        button.dataset.id = request.id;

        button.className =
            "bg-green-700 text-white px-4 py-2 rounded-lg mt-4";

        card.append(title, donor, destination, date, button);

        list.appendChild(card);
    });
}

// Accept a volunteer collection
document.getElementById("volunteerList")
    .addEventListener("click", function(event) {

        const button = event.target.closest("button[data-id]");

        if (!button) return;

        const id = Number(button.dataset.id);

        const request = volunteerRequests.find(
            item => item.id === id
        );

        if (!request || request.status !== "Available") {
            return;
        }

        request.status = "Accepted";

        activities.push({

            description:
                "Accepted delivery of " + request.food,

            status: "Accepted"
        });

        displayVolunteerRequests();
        displayActivity();
        updateStatistics();

        alert("Collection accepted successfully!");
    });

// Display customer activity
function displayActivity() {

    const list = document.getElementById("activityList");

    list.innerHTML = "";

    if (activities.length === 0) {

        list.textContent = "No collection activity yet.";
        return;
    }

    activities.forEach(activity => {

        const item = document.createElement("div");

        item.className =
            "border-b py-3 flex justify-between gap-4";

        const description = document.createElement("span");
        description.textContent = activity.description;

        const status = document.createElement("span");
        status.className = "text-green-700 font-semibold";
        status.textContent = activity.status;

        item.append(description, status);

        list.appendChild(item);
    });
}

// Update dashboard statistics
function updateStatistics() {

    const role = roleSelect.value;

    let available = donations.filter(
        donation => donation.status === "Available"
    ).length;

    let myCollections = activities.length;

    let completed = activities.filter(
        activity => activity.status === "Completed"
    ).length;

    document.getElementById("availableCount").textContent =
        available;

    document.getElementById("myCollections").textContent =
        myCollections;

    document.getElementById("completedCount").textContent =
        completed;
}

// Search available food
document.getElementById("searchFood")
    .addEventListener("input", displayDonations);

// Switch user dashboard
roleSelect.addEventListener("change", changeDashboard);

// Load initial dashboard
changeDashboard();
