// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = []; // Array to hold tasks

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Retrieve and trim the task text
        if (taskText) {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn');

            // Assign a click event to the remove button
            removeButton.onclick = function() {
                taskList.removeChild(listItem); // Remove the list item from the task list
                tasks = tasks.filter(task => task !== taskText); // Remove from tasks array
                updateLocalStorage(); // Update Local Storage
            };

            // Append the remove button to the list item and the list item to the task list
            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);

            // Update tasks array and Local Storage
            if (save) {
                tasks.push(taskText); // Add to tasks array
                updateLocalStorage(); // Update Local Storage
            }

            // Clear the input field
            taskInput.value = '';
        }
    }

    // Function to update Local Storage
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks array to Local Storage
    }

    // Load tasks when the page loads
    loadTasks();

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim(); // Get trimmed input
        addTask(taskText); // Call addTask with the new task
    });

    // Add event listener for the 'keypress' event to allow adding tasks with "Enter"
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get trimmed input
            addTask(taskText); // Call addTask with the new task
        }
    });
});


    
        
