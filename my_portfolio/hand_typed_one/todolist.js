
///グローバル変数//////////////////////////
let inputField=document.getElementById("inputField");
let addButton=document.getElementById("addButton");
let taskList=document.getElementById("taskList");

let uncompletedList=[];
let dropDown=document.getElementById("priority");
let sort_button=document.getElementById("sort");
let wholeContainer=document.querySelector(".wholeContainer");
let isThereTheHeader=false;
//competed tasklist↓↓//////
let visual_completed_ul=document.createElement("ul");
        visual_completed_ul.classList.add("completed");
let completedList=[];
let completed_index=null;
let span_text=null;
let isThereCompletedList=false;
let former_index=null;
let current_index=null;

let clicked_index=null;

//ヘッダー生成↓↓
let completed_header =document.createElement("div");
completed_header.innerHTML="完了したタスク";


function do_the_sequence(){
        //追加ボタンアニメーション///////
    addButton.classList.add('addButtonPushed');
    setTimeout(() => {
    addButton.classList.remove('addButtonPushed');
  }, 100); // matches your 0.1s-ish transition



        wholeContainer.appendChild(taskList);

        let taskText=inputField.value.trim();
        if(!taskText){                  
        window.alert("タスクを入力してください！");
        }else{
        ///li/////////////////////////////
        let li =document.createElement("li");
        let span=document.createElement("span");
        li.classList.add("smoothGrowing");
          li.addEventListener('animationend', () => {
        li.classList.remove('smoothGrowing');
        });
        taskList.prepend(li);
        li.appendChild(span);
        //レシーブアニメーション/////
        li.classList.add('receivingInCompletedList');
        li.addEventListener('animationend', () => {
        li.classList.remove('receivingInCompletedList');
        
        })
                

        


        span.textContent=taskText;

        ///配列に追加(プリペンド)///////////////
        uncompletedList.unshift({taskName:taskText,completed:false,priority:Number(dropDown.value),index:uncompletedList.length+1,id:Date.now()});
        console.log(uncompletedList);
        //localStorageへ保存///////
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
let id=uncompletedList[0].id;

createCheckBox(li,span,id);

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
            
        cleaningItself();

})}


 function cleaningItself(){                                           
                                                       if(completedList.length===0){
                                                                completed_header.remove();
                                                                visual_completed_ul.remove();
                                                            };

                                                        if(uncompletedList.length===0){
                                                                taskList.remove();

                                                        }
                                                            }     



function createCompletedCheckBox(li,span,item){
                                let checkBox=document.createElement("input");
                                checkBox.type="checkbox";
                                checkBox.checked=true;
                                checkBox.dataset.id=item.id;
                                checkBox.classList.add("completed_checkBox");
                                li.prepend(checkBox);
                                span.classList.add("completed");
                                //イベントリスナー↓↓/////
                                checkBox.addEventListener("change",(e)=>{
                              
                                 
                                                let clicked_checkBox_id=Number(e.target.dataset.id);
                                                span_text=e.target.nextElementSibling.innerText//li のtaskNameを取得
                                                //completedList上のインデックス↓↓////
                                                completed_index= completedList.findIndex((item)=>{
                                                        return item.id===clicked_checkBox_id
                                                })
                                                //uncompletedList（前のリストでの）インデックス↓↓///
                                                former_index=completedList[completed_index].index;
                                                console.log("completed_index is..."+completed_index);        
                                                current_index=uncompletedList.findIndex((item)=>{
                                                        return item.index===former_index
                                                });
                                                console.log("current_index is..."+current_index);
                                                uncompletedList[current_index].completed=false;
                                               
                                                let li= document.createElement("li");
                                                let span=document.createElement("span");
                                                if(completedList[completed_index].priority===1){
                                                li.classList.add("priority1");
                                                }else if(completedList[completed_index].priority===2){
                                                        li.classList.add("priority2");
                                                }else if(completedList[completed_index].priority===3){
                                                        li.classList.add("priority3");
                                                }
                                              

                                                //チェックボックス生成↓↓////
                                                let id=completedList[completed_index].id;
                                                createCheckBox(li,span,id);
                                                li.appendChild(span);
                                                //編集ボタン生成↓↓/////
                                                createEditButton(li,span);
                                                //削除ボタン生成↓↓////
                                                createDeleteButton(li); 

                                                taskList.appendChild(li);
                                                
                                                e.target.parentElement.remove();
                                                   completedList.splice(completed_index,1);
                                                localStorage.setItem("savedCompletedList",JSON.stringify(completedList));
                                                console.log("savedCompletedList is...");
                                                console.log(localStorage.getItem("savedCompletedList"));
                                                console.log("completedList is...");
                                                console.log(completedList);
                                                span.innerText=span_text;
                                                

                                               
                                                cleaningItself();


                                                localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList))
                                        })
                                }


function createCompletedDelButton(li,span){
                                let delButton=document.createElement("button");
                                li.appendChild(delButton);
                                delButton.innerHTML="削除";

                                delButton.addEventListener("click",(e)=>{//クリックハンドラ設置
                                        delButton.parentElement.remove();//liを視覚的に削除
                                        let clicked_li_text=e.target.previousElementSibling.previousElementSibling.innerText
                                        console.log("clicked_li_text is..."+clicked_li_text);
                                        let clicked_index=completedList.findIndex((item)=>{
                                        return item.taskName===clicked_li_text
                                        });
                                        console.log("del button clicked!");
                                        console.log("The clicked index is.."+clicked_index);
                                        uncompletedList.splice(clicked_index,1);//uncompletedListからアイテムを削除
                                        console.log("Current JS array")
                                        console.log(uncompletedList);//アイテムがuncompletedListから削除されたことを確認
                                        localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList))//localStorageを更新されたJS配列で上書き
                                        console.log("Current localStorage array");
                                        console.log(localStorage.getItem("savedUncompletedList"));
                                        completedList.splice(clicked_index,1);//completedListからアイテムを削除

                                        localStorage.setItem("savedCompletedList",JSON.stringify(completedList));//completedListをlocalStorageに保存
                                        console.log("savedCompletedList is...");
                                        //savedCompletedListを確認↓↓
                                        console.log(JSON.parse(localStorage.getItem("savedCompletedList")));

                                        cleaningItself();

                                })
                
                        }


function receiveAnimation(li,item){
             

                                //レシーブアニメーション/////
                                   li.classList.add('receivingInCompletedList');
                                li.addEventListener('animationend', () => {
                                li.classList.remove('receivingInCompletedList');
                                },{ once: true })
                                
}





function createCheckBox(li,span,id){
let checkBox=document.createElement("input");
checkBox.type="checkbox";
//チェックボックスにid付与↓↓////
checkBox.dataset.id=id;
li.prepend(checkBox);
        //チェックボックスにイベントリスナー↓↓/////
        checkBox.addEventListener("change",(e)=>{  
                span.classList.toggle("completed");
                let clicked_checkBox_id=e.target.dataset.id;
                console.log("clicked_checkBox_id"+clicked_checkBox_id);

                clicked_index=uncompletedList.findIndex((item)=>{
                return item.id===Number(clicked_checkBox_id)
                });
                console.log("clicked_index is..."+clicked_index);
                //uncompletedListを更新↓↓
                uncompletedList[clicked_index].completed=!uncompletedList[clicked_index].completed?true:false;
                console.log("uncompletedList[clicked?index] is...");
                console.log(uncompletedList[clicked_index]);
                //localStorageへuncompletedListを保存↓↓
                localStorage.setItem("savedUncompletedList",JSON.stringify(uncompletedList));
                console.log("uncompletedList is...");
                console.log(uncompletedList);
                //↓completedList生成
                completedList=uncompletedList.filter((item)=>{
                        return item.completed
                });
                console.log("competedList is...");
                console.log(completedList);
                //localStorageへcompletedListを保存↓↓
                localStorage.setItem("savedCompletedList",JSON.stringify(completedList));
                if(completedList.length>0){
                        
                        wholeContainer.appendChild(completed_header);
                        

                        if(!isThereTheHeader){
                        wholeContainer.appendChild(completed_header);
                        isThereTheHeader=true;
                        }
                         visual_completed_ul.innerHTML="";
                        completedList.forEach((item)=>{
                              
                               
                                
                               
                               
                                let li=document.createElement("li");
                                let span=document.createElement("span");
                                span.innerHTML=item.taskName;
                                li.classList.add("smoothGrowing");
                                li.addEventListener('animationend', () => {
                                li.classList.remove('smoothGrowing');
                                });

                                 wholeContainer.appendChild(visual_completed_ul);
                                visual_completed_ul.appendChild(li);
                                li.appendChild(span);
                                
                    

                                //退去アニメーション/////
                                e.target.parentElement.classList.add('taskCompleted');
                                e.target.parentElement.addEventListener('animationend', () => {
                                e.target.parentElement.classList.remove('taskCompleted');
                                e.target.parentElement.remove();  //視覚的にuncompletedListから除去
                                })

                                //レシーブアニメーション/////
                                       if(item.index===uncompletedList[clicked_index].index){
                                receiveAnimation(li,item);
                                       }
                                //チェックボックス生成/////////
                                createCompletedCheckBox(li,span,item);
                                //削除ボタン生成/////////////
                                createCompletedDelButton(li,span);
                                


                                




                        });
                       


    }else if(completedList.length===0){
        completed_header.remove();

    }

})

                
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
let restoredUncompletedListData=JSON.parse(localStorage.getItem("savedUncompletedList"));//JSON.parseでJS配列に変換
let restoredCompletedListData=JSON.parse(localStorage.getItem("savedCompletedList"));



if(!restoredUncompletedListData && !restoredCompletedListData){
        console.log("There is no data.");
        return
}else if(restoredUncompletedListData || restoredCompletedListData){
        uncompletedList=restoredUncompletedListData;//JS配列にrestoredUncompletedListDataを入れる　じゃないとリフレッシュすると空になってしまう
        completedList=restoredCompletedListData;
        console.log("uncompletedList=");
        console.log(uncompletedList);
         console.log("completedList=");
        console.log(completedList);
       
        cleaningItself()
       
       //uncompletedListを復元////////////////////
        restoredUncompletedListData.forEach((item,i)=>{
        if(item.completed){
                return
        }
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

        ///編集ボタン生成/////////////

        createEditButton(li,span);




        ///削除ボタン生成//////////
        createDeleteButton(li);


      ///チェックボックス生成////////
      let id=item.id
        createCheckBox(li,span,id);


        })


        //competedListを復元//////////

        //     もし復元したcompletedリストにアイテムが存在したら
          if(restoredCompletedListData.length>0){
                        
                        
                       //もしヘッダーがすでになかったら　 
                        if(!isThereTheHeader){
                        //ヘッダーを設置
                        wholeContainer.appendChild(completed_header);
                        //ヘッダーが存在する　にtrueをセット
                        isThereTheHeader=true;
                        }
                }else if(restoredCompletedListData.length===0){
                        completed_header.remove();
                }


        restoredCompletedListData.forEach((item,i)=>{

        
                        let li=document.createElement("li");
                        let span=document.createElement("span");
                        span.innerHTML=item.taskName;
                                wholeContainer.appendChild(visual_completed_ul);
                        visual_completed_ul.appendChild(li);
                        li.appendChild(span);
               
                        //チェックボックスを生成/////////////
                        createCompletedCheckBox(li,span,item);

                        //削除ボタンを生成//////////////////
                        createCompletedDelButton(li,span);








        })

}


}


