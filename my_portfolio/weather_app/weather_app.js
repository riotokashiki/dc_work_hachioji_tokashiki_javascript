let text_field = document.querySelector("input");
let decide_button = document.getElementById("submit");







window.addEventListener("keydown",(e)=>{
if(e.key=="Enter" && document.activeElement===text_field){
        decide();
}
})



function decide(){
let input_value = text_field.value.trim();
console.log("input_value is.."+input_value);


if(!input_value){
        alert("都市名を入力してください！");
}

fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=3807063e9008b4510b520cbfa45c5059")
.then((response)=>{
console.log(response);
return response.json();
})
.then((data)=>{
console.log(data);

})
.catch((error)=>{
        console.error(error);
})

text_field.value="";


}






decide_button.addEventListener("click",()=>{

decide()




})














