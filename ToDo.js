const writehere = document.getElementById("write");
const listhere = document.getElementById("listbox");
const priority = document.getElementById("setpriority");
const addButton = document.querySelector(".typebox button");
let priorityNumber;
// Function to add a new list item
function addList() {
  if (writehere.value === "") {
    alert("You haven't written anything. Please write some task first!");
  } else {
    priorityNumber = parseInt(priority.value);
    // Create a new list item
    let create_li = document.createElement("li");
    create_li.innerHTML = `${writehere.value} (Priority: ${priorityNumber})`; // Include priority
    create_li.dataset.priority = priorityNumber;
    listhere.appendChild(create_li);
    // Add delete button
    let cross_span = document.createElement("span");
    cross_span.innerHTML = '<img src="image/x2.png" />';
    create_li.appendChild(cross_span);

    sortlist();
    writehere.value = "";
    savelist();
  }
}
// Function to mark as checked/unchecked or delete
listhere.addEventListener("click", function (checking) {
    if (checking.target.tagName === "LI") {
      checking.target.classList.toggle("ticked"); // Toggle class for checked/unchecked
      savelist();
    } else if (checking.target.tagName === "IMG") {
      checking.target.closest("li").remove(); // Remove the list item
      savelist();
    }
  },
  false
);
// Function to sort by priority
function sortlist() {
  let items = Array.from(listhere.children);
  items.sort((a, b) => {
    let priorityA = parseInt(a.dataset.priority);
    let priorityB = parseInt(b.dataset.priority);
    return priorityA - priorityB;
  });
  listhere.innerHTML = ""; // Clear the list
  items.forEach((item) => listhere.appendChild(item)); // Re-add sorted items
}

// Function for handling keys clicking and arrow choice and cursor
document.addEventListener("DOMContentLoaded", function() {
  writehere.focus();
});
writehere.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      priority.focus();
    }
  }
);
priority.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addButton.click();
      writehere.focus();
    }
    else if (event.key >= "1" && event.key <= "5") {
      priority.value = event.key;
    }
  }
);
// Add and remove the 'focused' class on focus and blur events
priority.addEventListener("focus", function() {
  priority.classList.add("focused");
});
priority.addEventListener("blur", function() {
  priority.classList.remove("focused");
});

// Function to save and show the list in local storage(browser)
function savelist() {
  localStorage.setItem("ListData", listhere.innerHTML);
}
function showlist() {
  listhere.innerHTML = localStorage.getItem("ListData");
}

showlist();
