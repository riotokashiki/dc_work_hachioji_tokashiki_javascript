const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();//value in the input field  テキストボックスへ入力された値（文字等）

/// fallback plan/////////////////////////////////////////////////////////////
  if (taskText === "") {//もしテキストがなにも記入されていなかったら、
    alert("Please enter a task!");//アラートを鳴らし、
    return;//関数を終了。
  }
  ////////////////////////////////////////////////////////////////////////////

  const taskItem = document.createElement('li');
  //checkbox on the LEFT
  const checkbox=document.createElement('input');//input 要素を生成
  checkbox.type='checkbox';//それをチェックボックスへと変化させる
  checkbox.classList.add('task-checkbox');//cssクラスを付与

// task text
const taskSpan = document.createElement('span');

  taskSpan.textContent = taskText;

  //  creating a delete button 
  const deleteButton = document.createElement('button'); //button要素を作成
  deleteButton.textContent = "Delete";//buttonの上にDeleteと書いた
  deleteButton.classList.add('delete-btn');//.delete-btnのcssクラスを付与した

  // delete only, no toggle

  deleteButton.addEventListener('click', (e) => {

    e.stopPropagation();

    taskItem.remove();

  });
  

  //  toggle completed  when checkbox changes

  checkbox.addEventListener('change', 
  () => {

    taskItem.classList.toggle('completed', checkbox.checked);

  });


  // order = LEFT → RIGHT

  taskItem.appendChild(checkbox);     // left

  taskItem.appendChild(taskSpan);     // center

  taskItem.appendChild(deleteButton); // right
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