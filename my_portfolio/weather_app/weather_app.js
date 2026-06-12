let text_field = document.querySelector("input");
let decide_button = document.getElementById("submit");
let city_name_li = document.getElementById("city_name");
let country_code_li=document.getElementById("country_code")
let temp_li = document.getElementById("temperature");
let feelsLike_li = document.getElementById("feelsLike");
let humidity_li=document.getElementById("humidity");
let wind_li=document.getElementById("wind");
let weather_li=document.getElementById("weather");
let the_ul=document.getElementById("ul");
let all_lis=Array.from(document.querySelectorAll("li"));

let your_api_key ="3807063e9008b4510b520cbfa45c5059";
let city_name=null;
let country_code=null;
let humidity = null;
let wind=null;
let weather=null;


window.addEventListener("keydown",(e)=>{
if(e.key=="Enter" && document.activeElement===text_field){
        decide();
}
})



function kel_to_cel(kelvin){
        let cel_temp=Math.trunc(kelvin-273.15);
        return cel_temp
}

function judge_weather(weather){
        if(300>weather>=200){
                return"雷雨";
        }else if(500>weather>=300){
                return"土砂降り";
        }else if(600>weather>=500){
                return"雨";
        }else if(700>weather>=600){
                return"雪";
        }
        else if(800>weather>=700){
                return"霧";

        }else if(weather==800){
                return"晴れ";
        }else if(weather>800){
                return"くもり";
        }else{
                return"取得不能";
        }


}



async function decide(){
let input_value = text_field.value.trim();
console.log("input_value is.."+input_value);


if(!input_value){
        alert("都市名を入力してください！");
}




await fetching();





async function fetching(){

let geocoding_api_query= `https://api.openweathermap.org/geo/1.0/direct?q=${input_value}&limit=1&appid=${your_api_key}`      
let geocoding_api_response= await fetch(geocoding_api_query);     

let resolved1=await geocoding_api_response.json();


if(resolved1.cod==="404"){
        alert("都市が見つかりませんでした。")
        text_field.value="";
        return
}



console.log(resolved1)
if(resolved1.length>0){

        let latitude=resolved1[0].lat;
        let longitude=resolved1[0].lon;
        country_code=resolved1[0].country;
        console.log("country code is.."+country_code);
        console.log("latitude is..."+latitude);
        console.log("longitude is..."+longitude);

        let weather_api_query=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${your_api_key}`
        let weather_api_response = await fetch(weather_api_query);
        console.log("sent query is.."+weather_api_query);

        let resolved2=await weather_api_response.json();
        if(resolved2.cod==="404"){
                alert("都市が見つかりませんでした。")
                text_field.value="";
                return
        }





        console.log(resolved2);
        city_name = resolved2.name;
        console.log(city_name);
        // country_code=resolved2
        temperature=Number(resolved2.main.temp);
        humidity=resolved2.main.humidity;
        wind=resolved2.wind.speed;
        weather=Number(resolved2.weather[0].id);
        console.log("weather code is..."+weather);

        

        city_name_li.innerHTML = input_value;
        country_code_li.innerHTML="国コード："+country_code;
        temp_li.innerHTML = `${kel_to_cel(temperature)}${"&deg;C"}`;
        humidity_li.innerHTML="湿度 "+humidity+"%";
        wind_li.innerHTML="風速 "+wind+"m/s";
        weather_li.innerHTML=judge_weather(weather);
        text_field.value="";
}else{      
text_field.value="";
all_lis.forEach((item)=>{
item.innerHTML="";
city_name_li.innerHTML = "取得できませんでした。<br>次の入力をどうぞ。";



})
}  
}

}






decide_button.addEventListener("click",()=>{

decide()




})














