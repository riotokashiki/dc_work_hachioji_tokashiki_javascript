const taskInput = document.getElementById('task-input');//入力フィールド取得
const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const completedList = document.getElementById('completed-list');

const completedHeading = document.createElement('h3');
completedHeading.textContent = 'Completed';
completedHeading.style.display = 'none'; 
completedList.before(completedHeading);



function toggleCompletedHeading() {
  if (completedList.children.length > 0) {
    completedHeading.style.display = 'block';  // Show "Completed"
  } else {
    completedHeading.style.display = 'none';   // Hide "Completed" 
  }
}




// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();//value in the input field  テキストボックスへ入力された値（文字等）//trim()にて空白除去

/// fallback plan/////////////////////////////////////////////////////////////
  if (taskText === "") {//もしテキストがなにも記入されていなかったら、
    alert("Please enter a task!");//アラートを鳴らし、
    return;//関数を終了。
  }
  ////////////////////////////////////////////////////////////////////////////

  const taskItem = document.createElement('li');
  taskItem.addEventListener('click', () => {
  console.log("LI clicked!");
});
  //checkbox on the LEFT
  const checkbox=document.createElement('input');//input 要素を生成
  checkbox.type='checkbox';//それをチェックボックスへと変化させる
  checkbox.classList.add('task-checkbox');//cssクラスを付与

// task text
const taskSpan = document.createElement('span');

  taskSpan.textContent = taskText;// spanをinputされたvalueで上書き

  //  creating a delete button 
  const deleteButton = document.createElement('button'); //button要素を作成
  deleteButton.textContent = "Delete";//buttonの上にDeleteと書いた
  deleteButton.classList.add('delete-btn');//.delete-btnのcssクラスを付与した

  // delete only, no toggle

  deleteButton.addEventListener('click', (e) => {//deleteButtonにclick handlerを付与

    e.stopPropagation();

    taskItem.remove();

  });
  

  //  toggle completed  when checkbox changes

checkbox.addEventListener('change', (e) => {
  e.stopPropagation();
    console.log('Checkbox changed!', checkbox.checked);  // ← ADD THIS
  console.log('completedList exists?', !!completedList);  // ← ADD THIS
  taskItem.classList.toggle("completed");
  
  if (checkbox.checked) {
    completedList.prepend(taskItem);
  } else {
    const originalIndex = parseInt(taskItem.dataset.originalIndex);
  taskList.insertBefore(taskItem, taskList.children[originalIndex] || null);  // 
  }

toggleCompletedHeading();

});




  // order = LEFT → RIGHT

  taskItem.appendChild(checkbox);     // left

  taskItem.appendChild(taskSpan);     // center

  taskItem.appendChild(deleteButton); // right
  taskItem.dataset.originalIndex = taskList.children.length; 
  taskList.prepend(taskItem);
  // Clear the input field
  taskInput.value = "";
}
// Event listener for the add button
addButton.addEventListener('click', addTask);//addButtonにclick handlerを付与
// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {//入力フィールドにkeypress handlerを付与//e はevent object that contains data of the user action
  if (e.key === 'Enter') {
    addTask(); //addTask()を実行
  }
});