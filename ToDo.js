const writehere = document.getElementById("write");
const listhere = document.getElementById("listbox");

// Function to add a new list item
function addList() {
    if (writehere.value === '') {
        alert("You haven't written anything. Please write some task first!");
    } else {
        let priority = prompt("Enter Priority for this List (1-5):");
        priority = parseInt(priority);
        if (isNaN(priority) || priority < 1 || priority > 5) {
            alert("Please enter a valid priority from (1-5).");
            return;
        }

        // Create a new list item
        let create_li = document.createElement("li");
        create_li.innerHTML = `${writehere.value} (Priority: ${priority})`; // Include priority
        create_li.dataset.priority = priority;
        listhere.appendChild(create_li);

        // Add delete button
        let cross_span = document.createElement("span");
        cross_span.innerHTML = '<img src="image/x2.png" />';
        create_li.appendChild(cross_span);

        sortlist(); // Sort the list
        writehere.value = ''; // Clear the input field
        savelist(); // Save the list
    }
}

// Function to mark as checked/unchecked or delete
listhere.addEventListener("click", function(checking) {
    if (checking.target.tagName === "LI") {
        checking.target.classList.toggle("ticked"); // Toggle class for checked/unchecked
        savelist(); // Save the list
    } else if (checking.target.tagName === "IMG") {
        checking.target.closest("li").remove(); // Remove the list item
        savelist(); // Save the list
    }
}, false);

// Function to sort by priority
function sortlist() {
    let items = Array.from(listhere.children);
    items.sort((a, b) => {
        let priorityA = parseInt(a.dataset.priority);
        let priorityB = parseInt(b.dataset.priority);
        return priorityA - priorityB;
    });
    listhere.innerHTML = ''; // Clear the list
    items.forEach(item => listhere.appendChild(item)); // Re-add sorted items
}

// Function to save the list in local storage
function savelist() {
    localStorage.setItem("ListData", listhere.innerHTML);
}

// Function to show the list from local storage
function showlist() {
    listhere.innerHTML = localStorage.getItem("ListData");
}

showlist(); // Show the list
