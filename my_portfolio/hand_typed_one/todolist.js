//element取得
let textValue=document.getElementById("inputField").value.trim();
const inputField=document.getElementById("inputField");
const addButton=document.getElementById("addButton");
const ul=document.querySelector(".taskList");

addButton.addEventListener("click",(e)=>{ //addButtonへclick handlerを付与
  console.log("add button clicked!")
  addTask();

})
inputField.addEventListener("keypress",(e)=>{
if(e.key==="Enter"){
  addTask();

}

})






function addTask(){

//fetching the input field value////////////////////////////////////////
textValue=document.getElementById("inputField").value.trim();
////////////////////////////////////////////////////////////////////////



////////creating elements in memory//////////////////////////////
//list//
const generatedLi =document.createElement("li");
generatedLi.classList.add("list");

//check box
const generatedCheckBox=document.createElement("input");
generatedCheckBox.type="checkbox";
generatedCheckBox.addEventListener("change",()=>{
generatedLi.classList.toggle("checked");
});


//text span//
if(textValue===""){
  alert("input something!!");
  return;//ここで関数は止まる
}

const generatedSpan=document.createElement("span");
generatedSpan.classList.add("span");
generatedSpan.textContent=textValue;


//delete button//
const generatedDeleteButton=document.createElement("button");
generatedDeleteButton.textContent="delete";
generatedDeleteButton.classList.add("deleteButton");
generatedDeleteButton.addEventListener("click",()=>{
  generatedLi.remove()
});

////////////////////////////////////////////////////////////////////////


////attaching those elements above onto DOM structure/////////////

generatedLi.appendChild(generatedCheckBox);
generatedLi.appendChild(generatedSpan);
generatedLi.appendChild(generatedDeleteButton);


ul.prepend(generatedLi);


////////////////////////////////////////////////////////////////////////







//clearing the input field////////////////////////////////////////////
inputField.value="";
//////////////////////////////////////////////////////////////////////
}



function checked(){






}