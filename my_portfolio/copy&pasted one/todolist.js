const taskInput = document.getElementById('task-input');//入力フィールド取得
const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
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

  /*  e.stopPropagation();*/

    taskItem.remove();

  });
  

  //  toggle completed  when checkbox changes

  checkbox.addEventListener('change', // adding a change handler to the checkbox. change handler triggers when the checkbox checked.
  () => {

    taskItem.classList.toggle('completed', checkbox.checked);// CSS 付与切り替え
                                                    //class              // condition         if checkbox.checked is true, it adds .completed and removes it if it's false.
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
addButton.addEventListener('click', addTask);//addButtonにclick handlerを付与
// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {//入力フィールドにkeypress handlerを付与//e はevent object that contains data of the user action
  if (e.key === 'Enter') {
    addTask(); //addTask()を実行
  }
});