let text_field = document.querySelector("input");
let decide_button = document.getElementById("submit");
let city_name_li = document.getElementById("city_name");
let temp_li = document.getElementById("temperature");
let feelsLike_li = document.getElementById("feelsLike");
let humidity_li=document.getElementById("humidity");
let wind_li=document.getElementById("wind");


let your_api_key ="3807063e9008b4510b520cbfa45c5059";
let city_name=null;
let humidity = null;
let wind=null;


window.addEventListener("keydown",(e)=>{
if(e.key=="Enter" && document.activeElement===text_field){
        decide();
}
})



async function decide(){
let input_value = text_field.value.trim();
console.log("input_value is.."+input_value);


if(!input_value){
        alert("都市名を入力してください！");
}

function kel_to_cel(kelvin){
        let cel_temp=Math.trunc(kelvin-273.15);
        return cel_temp
}


await fetching();

async function fetching(){
let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input_value}&appid=${your_api_key}&lang=ja`)

let resolved=await response.json();
if(resolved.cod==="404"){
        alert("都市が見つかりませんでした。")
        text_field.value="";
        return
}

console.log(resolved)
console.log("sent value is..."+resolved)
city_name = resolved.name;
temperature=Number(resolved.main.temp);
console.log(city_name);
humidity=resolved.main.humidity;
wind=resolved.wind.speed

}

city_name_li.innerHTML = city_name;
temp_li.innerHTML = `${kel_to_cel(temperature)}${"&deg;C"}`;
humidity_li.innerHTML="湿度 "+humidity+"%";
wind_li.innerHTML="風速 "+wind+"m/s";



text_field.value="";


}






decide_button.addEventListener("click",()=>{

decide()




})














