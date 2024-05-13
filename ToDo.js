const writehere = document.getElementById("write");
const listhere = document.getElementById("listbox");
// for giving priority to each lists
function addList(){
    if (writehere.value === ''){
        alert("You haven't write anything, Please Write some Task first!");
    } else {
        let priority = prompt("Enter Priority for this List (1-5):", "3");
        priority = parseInt(priority);
        if (isNaN(priority) || priority < 1 || priority > 5){
            alert("Please Enter a Valid Priority from (1-5).");
            return;
        }
// for adding lists
        let create_li = document.createElement("li");
        create_li.innerHTML = writehere.value;
        create_li.dataset.priority = priority;
        listhere.appendChild(create_li);
        let cross_span = document.createElement("span");
        cross_span.innerHTML = '<img src="image/x2.png" />';
        create_li.appendChild(cross_span);
        sortlist();
    }
    writehere.value = '';
    savelist();
}
// for marking check and uncheck
listhere.addEventListener("click", function(checking){
    if(checking.target.tagName === "LI"){
        checking.target.classList.toggle("ticked");
        savelist();
    } 
    else if(checking.target.tagName === "IMG"){
        checking.target.closest("li").remove();
        savelist();
    }
}, false);
// for sorting by priority
function sortlist() {
    let items = Array.from(listhere.children);
    items.sort((a, b) => {
        let priorityA = parseInt(a.dataset.priority);
        let priorityB = parseInt(b.dataset.priority);
        return priorityA - priorityB;
    });
    listhere.innerHTML = '';
    items.forEach(item => listhere.appendChild(item));
}
// for saving and organising the tasks in local storage(Browser).
function savelist(){
    localStorage.setItem("ListData", listhere.innerHTML);
}
function showlist(){
    listhere.innerHTML = localStorage.getItem("ListData");
}

showlist();