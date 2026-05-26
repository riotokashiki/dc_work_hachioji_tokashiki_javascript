
///グローバル変数//////////////////////////
let inputField=document.getElementById("inputField");
let addButton=document.getElementById("addButton");
let taskList=document.getElementById("taskList");

let uncompletedList=[];




function createDeleteButton(li){
        let delButton=document.createElement("button");
        li.appendChild(delButton);
        delButton.innerHTML="削除";

        delButton.addEventListener("click",(e)=>{//クリックハンドラ設置
        delButton.parentElement.remove();//liを削除
        let clicked_li_text=e.target.previousElementSibling.innerHTML
        console.log(clicked_li_text);
        let clicked_index=uncompletedList.findIndex((item)=>{
        return item.taskName===clicked_li_text
        });
        console.log("The clicked index is.."+clicked_index);
        uncompletedList.splice(clicked_index,1);//JS配列からアイテムを削除
        console.log("Current JS array")
        console.log(uncompletedList);//アイテムが配列から削除されたことを確認
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList))//localStorageを更新されたJS配列で上書き
        console.log("Current localStorage array");
        console.log(localStorage.getItem("savedUncompletedList"));


        console.log(JSON.parse(localStorage.getItem("savedUncompletedList")));
            
})}

function createCheckBox(li,span){
let checkBox=document.createElement("input");
checkBox.type="checkbox";
li.prepend(checkBox);

    checkBox.addEventListener("change",(e)=>{
        span.classList.toggle("completed");
        let clicked_li_text=e.target.nextElementSibling.innerHTML
        console.log("clicked_li_text is..."+clicked_li_text);

        let clicked_index=uncompletedList.findIndex((item)=>{
        return item.taskName===clicked_li_text
        });
        console.log("clicked_index is..."+clicked_index);
        uncompletedList[clicked_index].completed=!uncompletedList[clicked_index].completed?true:false;
        console.log("uncompletedList[clicked?index] is...");
        console.log(uncompletedList[clicked_index]);
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
    })
}


///タスク追加ボタン///////////////
addButton.addEventListener("click",()=>{
        let taskText=inputField.value.trim();
        if(!taskText){
        window.alert("タスクを入力してください！");
        }else{
        ///li/////////////////////////////
        let li =document.createElement("li");
        let span=document.createElement("span");
        taskList.appendChild(li);
        li.appendChild(span);


        span.textContent=taskText;

        ///配列に追加＋localStorageへ保存///////
        uncompletedList.push({taskName:taskText,completed:false});
        console.log(uncompletedList);
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
        console.log(localStorage.getItem("savedUncompletedList"));
        ///削除ボタン////////////////

createDeleteButton(li);
    

///チェックボックス/////////


createCheckBox(li,span);



}

inputField.value="";


})


///セーブデータ復元////////////
restoreState()

function restoreState(){
let restoredData=JSON.parse(localStorage.getItem("savedUncompletedList"));//JSON.parseでJS配列に変換
if(!restoredData){
        console.log("There is no data.");
        return
}else{
        uncompletedList=restoredData;//JS配列にrestoredDataを入れる　じゃないとリフレッシュすると空になってしまう
        console.log("uncompletedList=");
        console.log(uncompletedList);
        restoredData.forEach((item,i)=>{
        ///li////////////////////   
        let li=document.createElement("li");
        let span=document.createElement("span");
        span.textContent=item.taskName;
        li.appendChild(span);
        taskList.appendChild(li);

        ///削除ボタン//////////
            createDeleteButton(li);


        ///チェックボックス////////
        let checkBox=document.createElement("input");
        checkBox.type="checkbox";
        if(item.completed){
        checkBox.checked=true;        
        span.classList.add("completed");
        }
        li.prepend(checkBox);
        checkBox.addEventListener("change",(e)=>{
        span.classList.toggle("completed");
        let clicked_li_text=e.target.nextElementSibling.innerHTML
        console.log("clicked_li_text is..."+clicked_li_text);

        let clicked_index=uncompletedList.findIndex((item)=>{
        return item.taskName===clicked_li_text
        });
        console.log("clicked_index is..."+clicked_index);
        uncompletedList[clicked_index].completed=!uncompletedList[clicked_index].completed?true:false;
        console.log("uncompletedList[clicked?index] is...");
        console.log(uncompletedList[clicked_index]);
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));

        })



        })

}


}


