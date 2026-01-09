const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;
  // Create checkbox on the LEFT
  const checkbox=document.createElement('input');
  checkbox.type='checkbox';
  checkbox.classList.add('task-checkbox');
  // Create a delete button for each task
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "Delete";
  deleteButton.classList.add('delete-btn');
  deleteButton.onclick = () => taskItem.remove(); // Remove task when clicked
  // Add the delete button to the task item
  taskItem.appendChild(checkbox);
  taskItem.appendChild(deleteButton);
  // Toggle completed state when clicked
  taskItem.onclick = () => taskItem.classList.toggle('completed');
  // Add the task to the list
  taskList.appendChild(taskItem);
  // Clear the input field
  taskInput.value = "";
}
// Event listener for the add button
addButton.addEventListener('click', addTask);
// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});