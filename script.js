// JavaScript code
const addButton = document.getElementById("addButton");
const priorityMenu = document.getElementById("priorityMenu");
let selectedPriority = null; // Variable to store the selected priority

// Event listener for hover effect
addButton.addEventListener('mouseover', () => {
    showPriorityBox(); // Always show priority box on hover
});


//addButton.addEventListener('mouseleave', () => {
   // hidePriorityBox(); // Always show priority box on hover
//});


// Event listener for click event to add task
addButton.addEventListener('click', addTask);

const inputSection = document.getElementById("input-section");
const listContainer = document.getElementById("list-container");

// Load tasks from localStorage when the page loads
window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToList(task.text, task.priority);
    });
});

function addTask() {
    const taskText = inputSection.value.trim();
    if (taskText === '') {
        alert("You must write something!");
        return;
    }

    if (!selectedPriority) {
        alert("Please select a priority!");
        return;
    }
    
    const priorityColor = selectedPriority.style.backgroundColor;
    addTaskToList(taskText, priorityColor);
    
    
    inputSection.value = "";
    hidePriorityBox(); // Hide priority box after adding task
}

function addTaskToList(taskText, priorityColor) {
    const li = document.createElement("li");
    li.innerHTML =  '<i class="far fa-circle" style="color: ' + priorityColor + ';"></i>'+ taskText + '<i class="far fa-times-circle cross icon"></i>';
    
    // Add event listener for task completion toggle
    li.addEventListener('click', toggleCompleted);
    
    // Add event listener for task deletion
    const deleteButton = li.querySelector('.cross');
    deleteButton.addEventListener('click', deleteTask);
    
    listContainer.appendChild(li);

    // Save task to localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, priority: priorityColor });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleCompleted() {
    this.classList.toggle("completed");
}

// Function to delete task
function deleteTask(event) {
    event.stopPropagation(); // Prevents the click event from being propagated to the parent li element
    const taskItem = this.parentNode;
    taskItem.remove();

    // Remove task from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = taskItem.textContent.trim();
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// JavaScript functions for Priority and Today buttons

function showPriorityBox() {
    priorityMenu.classList.add("show");
}

function hidePriorityBox() {
    priorityMenu.classList.remove("show");
}

function setPriority(color) {
    selectedPriority = document.querySelector(".priority-item.active");
    selectedPriority = selectedPriority ? selectedPriority : document.querySelector(".priority-item");
    selectedPriority.style.backgroundColor = color;
}

function showCalendar() {
    var calendar = document.getElementById("calendar");
    calendar.classList.toggle("show"); 
}