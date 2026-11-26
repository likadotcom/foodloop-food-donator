
// Sample user data for testing
// In the final system, this should come from a secure database.

let users = [
    {
        id: "001",
        name: "John Smith",
        email: "john@example.com",
        password: "johnpassword",
        role: "Donor",
        status: "Active"
    },
    {
        id: "002",
        name: "Sarah Jones",
        email: "sarah@example.com",
        password: "sarahpassword",
        role: "Recipient",
        status: "Active"
    },
    {
        id: "003",
        name: "David Brown",
        email: "david@example.com",
        password: "davidpassword",
        role: "Volunteer",
        status: "Inactive"
    },
    {
        id: "004",
        name: "Emily Wilson",
        email: "emily@example.com",
        password: "emilypassword",
        role: "Donor",
        status: "Active"
    },
    {
        id: "005",
        name: "Lika Malova",
        email: "lika@example.com",
        password: "likapassword",
        role: "Admin",
        status: "Active"
    },
    {
        id: "006",
        name: "Susmita Roy",
        email: "susmita@example.com",
        password: "susmitapassword",
        role: "Admin",
        status: "Active"
    }
];

// Display users in the table
function displayUsers(userList) {

    const table = document.getElementById("userTable");
    const emptyMessage = document.getElementById("emptyMessage");

    table.innerHTML = "";

    emptyMessage.classList.toggle(
        "hidden",
        userList.length !== 0
    );

    userList.forEach(user => {

        const row = document.createElement("tr");
        row.className = "border-b";

        const nameCell = document.createElement("td");
        nameCell.className = "p-4";
        nameCell.textContent = user.name;

        const emailCell = document.createElement("td");
        emailCell.className = "p-4";
        emailCell.textContent = user.email;

        const roleCell = document.createElement("td");
        roleCell.className = "p-4";
        roleCell.textContent = user.role;

        const statusCell = document.createElement("td");
        statusCell.className = "p-4";
        statusCell.textContent = user.status;

        const actionCell = document.createElement("td");
        actionCell.className = "p-4";

        const button = document.createElement("button");

        button.textContent =
            user.status === "Active" ? "Deactivate" : "Activate";

        button.dataset.id = user.id;
        button.className =
            "bg-green-700 text-white px-3 py-2 rounded";

        actionCell.appendChild(button);

        row.append(
            nameCell,
            emailCell,
            roleCell,
            statusCell,
            actionCell
        );

        table.appendChild(row);
    });

    updateStatistics();
}

// Update user statistics
function updateStatistics() {

    document.getElementById("totalUsers").textContent =
        users.length;

    document.getElementById("activeUsers").textContent =
        users.filter(user => user.status === "Active").length;

    document.getElementById("inactiveUsers").textContent =
        users.filter(user => user.status === "Inactive").length;
}

// Search and filter users
function filterUsers() {

    const search = document
        .getElementById("searchUser")
        .value.toLowerCase();

    const role = document
        .getElementById("roleFilter")
        .value;

    const filteredUsers = users.filter(user => {

        const matchesSearch =
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search);

        const matchesRole =
            role === "All" || user.role === role;

        return matchesSearch && matchesRole;
    });

    displayUsers(filteredUsers);
}

// Show registration form
document.getElementById("addUserButton")
    .addEventListener("click", () => {

        document.getElementById("userForm")
            .classList.remove("hidden");
    });

// Cancel registration
document.getElementById("cancelUserButton")
    .addEventListener("click", () => {

        document.getElementById("userForm")
            .classList.add("hidden");

        document.getElementById("userForm").reset();
    });

// Register a new user
document.getElementById("userForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("userEmail").value.trim();
        const role = document.getElementById("userRole").value;

        const message = document.getElementById("formMessage");

        const duplicate = users.some(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (duplicate) {
            message.textContent = "This email is already registered.";
            message.className = "mt-3 text-red-600";
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            role: role,
            status: "Active"
        };

        users.push(newUser);

        this.reset();
        this.classList.add("hidden");

        filterUsers();

        message.textContent = "";
    });

// Activate or deactivate users
document.getElementById("userTable")
    .addEventListener("click", function(event) {

        const button = event.target.closest("button[data-id]");

        if (!button) return;

        const userId = Number(button.dataset.id);

        const user = users.find(user => user.id === userId);

        if (!user) return;

        user.status =
            user.status === "Active" ? "Inactive" : "Active";

        filterUsers();
    });

// Search event
document.getElementById("searchUser")
    .addEventListener("input", filterUsers);

// Role filter event
document.getElementById("roleFilter")
    .addEventListener("change", filterUsers);

// Initial display
displayUsers(users);
