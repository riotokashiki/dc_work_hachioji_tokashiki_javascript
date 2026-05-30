
///グローバル変数//////////////////////////
let inputField=document.getElementById("inputField");
let addButton=document.getElementById("addButton");
let taskList=document.getElementById("taskList");

let uncompletedList=[];
let dropDown=document.getElementById("priority");
let sort_button=document.getElementById("sort");
let wholeContainer=document.querySelector(".wholeContainer");
let isThereTheHeader=false;
let visual_completed_ul=document.createElement("ul");
let completedList=[];
let completed_index=null;
let span_text=null;

function do_the_sequence(){

        let taskText=inputField.value.trim();
        if(!taskText){
        window.alert("タスクを入力してください！");
        }else{
        ///li/////////////////////////////
        let li =document.createElement("li");
        let span=document.createElement("span");
        taskList.prepend(li);
        li.appendChild(span);


        span.textContent=taskText;

        ///配列に追加＋localStorageへ保存///////
        uncompletedList.unshift({taskName:taskText,completed:false,priority:Number(dropDown.value),index:uncompletedList.length+1});
        console.log(uncompletedList);
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
        console.log("dropDown.value is..."+dropDown.value);
        console.log(localStorage.getItem("savedUncompletedList"));
        
        let priorityValue=Number(dropDown.value);

        if(priorityValue===1){
                li.classList.add("priority1");
        }else if(priorityValue===2){
                li.classList.add("priority2");
        }else { 
                li.classList.add("priority3");
        }

///チェックボックス/////////


createCheckBox(li,span);

///編集ボタン/////////////

createEditButton(li,span);


       ///削除ボタン////////////////

createDeleteButton(li);


}

inputField.value="";
dropDown.value="2";
inputField.removeAttribute("class");
inputField.classList.add("priority2");
        }


function createDeleteButton(li){
        let delButton=document.createElement("button");
        li.appendChild(delButton);
        delButton.innerHTML="削除";

        delButton.addEventListener("click",(e)=>{//クリックハンドラ設置
        delButton.parentElement.remove();//liを削除
        let clicked_li_text=e.target.previousElementSibling.previousElementSibling.innerHTML
        console.log(clicked_li_text);
        let clicked_index=uncompletedList.findIndex((item)=>{
        return item.taskName===clicked_li_text
        });
        console.log("del button clicked!");
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

        checkBox.addEventListener("change",(e)=>{  //イベントリスナー
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


                //↓completedList生成
                completedList=uncompletedList.filter((item)=>{
                        return item.completed
                });
                console.log("competedList is...");
                console.log(completedList);
                if(completedList.length>0){
                        let completed_header =document.createElement("div");
                        completed_header.innerHTML="完了したタスク";
                        
                        

                        if(!isThereTheHeader){
                        wholeContainer.appendChild(completed_header);
                        isThereTheHeader=true;
                        }

                        
                        let visual_completed_li=document.createElement("li");
                        let span=document.createElement("span");
                        span.innerHTML=completedList[completedList.length-1].taskName;
                        console.log(completedList[completedList.length-1].taskName);
                        wholeContainer.appendChild(visual_completed_ul);
                        visual_completed_ul.appendChild(visual_completed_li);
                        visual_completed_li.appendChild(span);
                        e.target.parentElement.remove();  //視覚的にuncompletedListから除去
                        //uncompletedList.splice(clicked_index,1);//配列から除去
                        //↓localStorageへJSON保存
                        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
                        console.log("uncompletedList is...");
                        console.log(uncompletedList);
                        //チェックボックス生成/////////
                        let checkBox=document.createElement("input");
                        checkBox.type="checkbox";
                        checkBox.checked=true;
                        visual_completed_li.prepend(checkBox);
                        span.classList.add("completed");
                        checkBox.addEventListener("change",(e)=>{//イベントリスナー
                              

                                completed_index= completedList.findIndex((item)=>{//completed_indexがうまくいかない
                                        span_text=e.target.nextElementSibling.innerText
                                        return e.target.nextElementSibling.innerText===item.taskName
                                })

                        console.log("completed_index is..."+completed_index);        
                        completedList.splice(completed_index,1);
                        console.log("completedList is...");
                        console.log(completedList);
                       let li= document.createElement("li");
                       let span=document.createElement("span");
                       span.innerText=span_text;
                       createCheckBox(li,span);
                       li.appendChild(span);
                       createEditButton(li,span);
                       createDeleteButton(li); 

                        taskList.appendChild(li);
                        uncompletedList
                        e.target.parentElement.remove();

                }, { once: true })



                //削除ボタン生成/////////////
                let delButton=document.createElement("button");
                visual_completed_li.appendChild(delButton);
                delButton.innerHTML="削除";

                delButton.addEventListener("click",(e)=>{//クリックハンドラ設置
                        delButton.parentElement.remove();//liを削除
                        let clicked_li_text=e.target.previousElementSibling.previousElementSibling.innerHTML
                        console.log(clicked_li_text);
                        let clicked_index=uncompletedList.findIndex((item)=>{
                        return item.taskName===clicked_li_text
                        });
                        console.log("del button clicked!");
                        console.log("The clicked index is.."+clicked_index);
                        uncompletedList.splice(clicked_index,1);//JS配列からアイテムを削除
                        console.log("Current JS array")
                        console.log(uncompletedList);//アイテムが配列から削除されたことを確認
                        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList))//localStorageを更新されたJS配列で上書き
                        console.log("Current localStorage array");
                        console.log(localStorage.getItem("savedUncompletedList"));


                        console.log(JSON.parse(localStorage.getItem("savedUncompletedList")));



        }, { once: true })}
    }, { once: true })

                
}

function createEditButton(li,span){
let editButton=document.createElement("button");
li.appendChild(editButton);
        editButton.innerHTML="編集";
let input_to_be_swapped=document.createElement("input");
editButton.addEventListener("click",(e)=>{//クリックハンドラ設置
        console.log("edit button clicked!");
        let clicked_li_text=e.target.previousElementSibling.innerHTML
        console.log("clicked_li_text =...");
        console.log(clicked_li_text);
        let clicked_index=uncompletedList.findIndex((item)=>{
        return item.taskName===clicked_li_text
        });
        let clicked_li_span=e.target.previousElementSibling;
        input_to_be_swapped.value=clicked_li_text;
        clicked_li_span.replaceWith(input_to_be_swapped);
        

        let set_button=document.createElement("button");
        set_button.innerHTML="決定";
        set_button.addEventListener("click",(e)=>{
                let edited_value=input_to_be_swapped.value;
                clicked_li_span.innerHTML=edited_value;
                console.log("e.target.previousElementSibling is..."+e.target.previousElementSibling);
                e.target.previousElementSibling.replaceWith(clicked_li_span);
                set_button.replaceWith(editButton);
                uncompletedList[clicked_index].taskName=edited_value;
                localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
                console.log("current JSON is...");
                console.log(JSON.parse(localStorage.getItem("savedUncompletedList")));
        })

        editButton.replaceWith(set_button);

        console.log("The clicked index is.."+clicked_index);
        console.log("Current JS array")
        console.log(uncompletedList);//アイテムが配列から削除されたことを確認
        console.log("Current localStorage array");
        console.log(localStorage.getItem("savedUncompletedList"));


        console.log(JSON.parse(localStorage.getItem("savedUncompletedList")));
            
})}


dropDown.addEventListener("change",(e)=>{
        inputField.removeAttribute("class");

if(e.target.value==="1"){

        inputField.classList.add("priority1");
}else if(e.target.value==="2"){

        inputField.classList.add("priority2")
}else{
        inputField.classList.add("priority3")
}

        
})


///Enterキーイベントリスナー//////////

window.addEventListener("keydown",(e)=>{
if(e.key=="Enter" && document.activeElement===inputField){
        do_the_sequence();
}
})




///整列ボタン//////////////////////

sort_button.addEventListener("click",()=>{
        uncompletedList.sort((a,b) =>{ return a.priority - b.priority});
        console.log("sort button clicked!");
        console.log(uncompletedList);
        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
        console.log(localStorage.getItem("savedUncompletedList"));
        taskList.innerHTML="";
        restoreState();
})






///タスク追加ボタン///////////////
addButton.addEventListener("click",()=>{
        
        do_the_sequence();


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
        if(item.priority===1){
                li.classList.add("priority1");
        }else if(item.priority===2){
                li.classList.add("priority2");
        }else{
                li.classList.add("priority3");
        };

        ///編集ボタン/////////////

        createEditButton(li,span);




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


