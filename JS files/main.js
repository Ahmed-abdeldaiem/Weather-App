let currentDate =document.querySelector('#currentDate');
let currentTime =document.querySelector('#currentTime');
let currentLocation =document.querySelector('#currentLocation');


//  today card
let today=document.querySelector('#today');
let todayDate=document.querySelector('#todayDate');
let todayDeg=document.querySelector('#todayDeg');
let todayDesc=document.querySelector('#todayDesc');
let todayImg=document.querySelector('#todayImg');
let windDirection=document.querySelector('#windDirection');
let windSpeed = document.querySelector('#windSpeed')

//  next day card
let nexDay=document.querySelector('#nexDay');
let nextDayDate=document.querySelector('#nextDayDate');
let nextDayMaxDeg=document.querySelector('#nextDayMaxDeg');
let nextDayMinDeg=document.querySelector('#nextDayMinDeg');
let nextDayDesc=document.querySelector('#nextDayDesc');
let nexDayImg=document.querySelector('#nexDayImg');
//  after next day card
let afterNextDay=document.querySelector('#afterNextDay');
let afterNextDate=document.querySelector('#afterNextDate');
let afterNextMaxDeg=document.querySelector('#afterNextMaxDeg');
let afterNextMinDeg=document.querySelector('#afterNextMinDeg');
let afterNextDesc=document.querySelector('#afterNextDesc');
let afterNextDayImg=document.querySelector('#afterNextDayImg');

let searchBtn = document.querySelector('#searchBtn');
let searchInput = document.querySelector('#searchInput');
let serverError = document.querySelector('#serverError');

//real time 

setInterval(function(){
    let date= new Date();
    let time=date.toLocaleTimeString()
let nowDate=date.toDateString()
// console.log(time);
// console.log(nowDate);


currentDate.innerHTML=`${nowDate}`;
currentTime.innerHTML=`${time}`
},1000)



// let day = days[date.getDay()];

// console.log(date);
// console.log(day);
// console.log(month);
// console.log(date.toLocaleDateString());

// let time=date.toLocaleTimeString()
// let nowDate=date.toDateString()
// console.log(time);
// console.log(nowDate);


// currentDate.innerHTML=`${nowDate}`;
// currentTime.innerHTML=`${time}`


function getTheDay(time){
let date= new Date(time);
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return day ;
}

function getTheMonth(time){
let date= new Date(time);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


let month = months[date.getMonth()];
return month ;
}






// get Location from DeoLocation API 
//https://api.ipgeolocation.io/ipgeo?apiKey=b944b7c20c504b3096bb8fc0fe761c5f

async function setCurrentLocation(){
    try {
        let response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=b944b7c20c504b3096bb8fc0fe761c5f');
        let location = await response.json();
        // console.log(location.country_name);
        // console.log(location.city);
        // console.log(location.country_capital);
        currentLocation.innerHTML=`<h1 class='fw-bold'>${location.country_name}</h1><h2 class="fw-semibold">${location.city}</h2>`
        let city = await location.city;
        
        return city
         
    } catch (error) {
        currentLocation.innerHTML=`${error} location data`
    }
 
   

}

async function getSearchWeatherData(city){
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c660b329e1b540869c4134233241304&q=${city}&days=3`);
        let weatherData = await response.json();
        // console.log(city);
        // console.log(weatherData);
        return weatherData
    
       
    } catch (error) {
        serverError.innerHTML=`${error} weather data`
    }
 
   

}
// setCurrentLocation();
// getSearchWeatherData(setCurrentLocation());


function setDataInPage(time1,deg1,desc1,icon1,time2,maxdeg2,mindeg2,desc2,icon2,time3,maxdeg3,mindeg3,desc3,icon3,windDir,windSpe){
    let date= new Date(time1);
    let date2= new Date(time2);
    let date3= new Date(time3);
    // console.log(time1);
    //  set today data 
     let todayName=getTheDay(time1);
     today.innerHTML=`${todayName}`;
     let theMonth=getTheMonth(time1);
     todayDate.innerHTML=`${date.getDate()}${theMonth}`
     todayDeg.innerHTML=`${deg1}`
     todayDesc.innerHTML=`${desc1}`
     todayImg.setAttribute('src',`https:${icon1}`)
     windDirection.innerHTML=`${windDir}`
     windSpeed.innerHTML=`${windSpe}Kph`



     //set next day
     let nexDayName=getTheDay(time2);
     nexDay.innerHTML=`${nexDayName}`
     let theMonth2=getTheMonth(time2);
     nextDayDate.innerHTML=`${date2.getDate()}${theMonth2}`
     nextDayMaxDeg.innerHTML=`${maxdeg2}`
     nextDayMinDeg.innerHTML=`${mindeg2}`
     nextDayDesc.innerHTML=`${desc2}`
     nexDayImg.setAttribute('src',`https:${icon2}`)
     
     

     //set after next day
     let afteNnexDayName=getTheDay(time3);
     afterNextDay.innerHTML=`${afteNnexDayName}`
     let theMonth3=getTheMonth(time3);
     afterNextDate.innerHTML=`${date3.getDate()}${theMonth3}`
     afterNextMaxDeg.innerHTML=`${maxdeg3}`
     afterNextMinDeg.innerHTML=`${mindeg3}`
     afterNextDesc.innerHTML=`${desc3}`
     afterNextDayImg.setAttribute('src',`https:${icon3}`)
   
     



}




async function start (){
    let city =''
    if (searchInput.value.trim().length===0) {
       city=await setCurrentLocation()
       let data=await getSearchWeatherData(city)
    //    console.log(data);
       setDataInPage(data.location.localtime,data.current.temp_c,data.current.condition.text,data.current.condition.icon,
        data.forecast.forecastday[1].date,data.forecast.forecastday[1].day.maxtemp_c,
        data.forecast.forecastday[1].day.mintemp_c,data.forecast.forecastday[1].day.condition.text,
        data.forecast.forecastday[1].day.condition.icon,
        data.forecast.forecastday[2].date,data.forecast.forecastday[2].day.maxtemp_c,
        data.forecast.forecastday[2].day.mintemp_c,data.forecast.forecastday[2].day.condition.text,
        data.forecast.forecastday[2].day.condition.icon,data.current.wind_dir,data.current.wind_kph
        );                                                                           
    }


    searchInput.addEventListener('input',async function(){
        // console.log(searchInput.value);
        city=searchInput.value;
        let data=await getSearchWeatherData(city)
    //    console.log(data);
       setDataInPage(data.location.localtime,data.current.temp_c,data.current.condition.text,data.current.condition.icon,
        data.forecast.forecastday[1].date,data.forecast.forecastday[1].day.maxtemp_c,
        data.forecast.forecastday[1].day.mintemp_c,data.forecast.forecastday[1].day.condition.text,
        data.forecast.forecastday[1].day.condition.icon,
        data.forecast.forecastday[2].date,data.forecast.forecastday[2].day.maxtemp_c,
        data.forecast.forecastday[2].day.mintemp_c,data.forecast.forecastday[2].day.condition.text,
        data.forecast.forecastday[2].day.condition.icon,
        data.current.wind_dir,data.current.wind_kph
        );  
        currentLocation.innerHTML=`<h1 class='fw-bold'>${data.location.name}</h1><h2 class="fw-semibold">${data.location.country}</h2>`
        if (searchInput.value.trim().length===0) {
            city=await setCurrentLocation()
            let data=await getSearchWeatherData(city)
            // console.log(data);
            setDataInPage(data.location.localtime,data.current.temp_c,data.current.condition.text,data.current.condition.icon,
             data.forecast.forecastday[1].date,data.forecast.forecastday[1].day.maxtemp_c,
             data.forecast.forecastday[1].day.mintemp_c,data.forecast.forecastday[1].day.condition.text,
             data.forecast.forecastday[1].day.condition.icon,
             data.forecast.forecastday[2].date,data.forecast.forecastday[2].day.maxtemp_c,
             data.forecast.forecastday[2].day.mintemp_c,data.forecast.forecastday[2].day.condition.text,
             data.forecast.forecastday[2].day.condition.icon,data.current.wind_dir,data.current.wind_kph
             );                                                                           
         }
    })

   

}



searchBtn.addEventListener('click',function(){
    start() 
})


start()



let year = document.querySelector('#year');
let date= new Date();
year.innerHTML=`${date.getUTCFullYear()}`



//theme action

let themeBtn=document.querySelector('#theme');
themeBtn.addEventListener('click', function(){
    let rootStyles = getComputedStyle(document.documentElement);
    // console.log(rootStyles.getPropertyValue('--main-color'));

    if (rootStyles.getPropertyValue('--main-color')=='#009ad8') {
       
        document.documentElement.style.setProperty('--main-color','#7FFFD4');
        document.documentElement.style.setProperty('--main-img',`url('../images/bg1.jpg')`);
        document.documentElement.style.setProperty('--btn-img',`url(../images/snow.png)`);

        
    }else{
        document.documentElement.style.setProperty('--main-color','#009ad8');
        document.documentElement.style.setProperty('--main-img',`url('../images/bg4.jpg')`);
        document.documentElement.style.setProperty('--btn-img',`url(../images/leaf4.jpg)`);

    }

// 009ad8
// #7FFFD4
// --main-img:url('../images/bg4.jpg');
//   --btn-img:url(../images/leaf4.jpg);
// --main-img:url('../images/bg1.jpg');
//   --btn-img:url(../images/snow.png);

})