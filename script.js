function showCurrentCityName (response){
    let currentCityName = response.data.name;
    console.log(currentCityName);
    let currentSearchedCityName = document.querySelector("#main-city");
    currentSearchedCityName.innerHTML = currentCityName;
    let currentCityTemperature = Math.round(response.data.main.temp);
    let currentCityDegree = document.querySelector("#city-temperature-value");
    console.log(currentCityTemperature);
    currentCityDegree.innerHTML = currentCityTemperature;
}

function showLocation (position){
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    let apiKey = "ed0b705eed2cc81cd6b87bb194b4d152";

    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showCurrentCityName);
}

function searchLocation(){
    navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationTemperature = document.querySelector("#current-location-button");
currentLocationTemperature.addEventListener("click", searchLocation);

function searchCityTemperature (response) {
    console.log(response);
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = response.data.weather[0].description;
    let searchedTemperature = Math.round(response.data.main.temp);
    let newTemperature = document.querySelector("#city-temperature-value");
    console.log(searchedTemperature);
    newTemperature.innerHTML = searchedTemperature;

    function isStable (event){
        event.preventDefault();
        let sameDegree = document.querySelector("#city-temperature-value");
        sameDegree.innerHTML = searchedTemperature;
    }

    let celcius = document.querySelector("#celcius");
    celcius.addEventListener("click", isStable);   
}

function search (event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar");
    let cityName = document.querySelector("#main-city");

    if (searchInput.value < 1){
        cityName
    }
    else{
        cityName.innerHTML=`${searchInput.value}`;
    }

    let apiKey = "ed0b705eed2cc81cd6b87bb194b4d152";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(searchCityTemperature);


    function count (event){
        event.preventDefault();
        let degree = document.querySelector("#city-temperature-value");
        let constant = 1.8;
        let scale = 32;
        let newDegree = Math.round(degree.innerHTML * constant + scale);
        degree.innerHTML = `${newDegree}`;
    }

    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click", count);
}

let form = document.querySelector("#city-info");
form.addEventListener("submit", search);

let now = new Date();
let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"
];
let currentDay = days[now.getDay()];
let currentInfo = document.querySelector("#current-date");
if (now.getMinutes()<10){
    currentInfo.innerHTML=`${currentDay}, ${now.getHours()}:0${now.getMinutes()}`;
}
else{
    currentInfo.innerHTML=`${currentDay}, ${now.getHours()}:${now.getMinutes()}`;
}
