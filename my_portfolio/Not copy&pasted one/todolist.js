//element取得
const textValue=document.getElementById("inputField").value.trim();
const addButton=document.getElementById("addButton");
const ul=document.getElementsByClassName("taskList");

addButton.addEventListener("click",(e)=>{ //addButtonへclick handlerを付与
  console.log("add button clicked!")
  addTask();

})







function addTask(){
////////creating elements in memory//////////////////////////////
//list//
const generatedLi =document.createElement("li");
generatedLi.classList.add("list");

//check box
const generatedCheckBox=document.createElement("input");
generatedCheckBox.type="checkbox";


//text span//
if(textValue===""){
  alert("input something!!");
  return;
}
else{
const generatedSpan=document.createElement("span");
generatedSpan.classList.add("span");
generatedSpan.textContent=textValue;
}

//delete button//
const generatedDeleteButton=document.createElement("button");
generatedDeleteButton.classList.add("deleteButton");

////////////////////////////////////////////////////////////////////////

////attaching those elements above onto DOM structure/////////////

ul.appendChild("generatedCheckBox");
ul.appendChild("generatedSpan");
ul.appendChild("generatedDeleteButton");


}