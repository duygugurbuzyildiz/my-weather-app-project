function formatDate (){
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
    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    if (hours < 10){
    hours = `0${hours}`;
    }
    return `${currentDay}, ${hours}:${minutes}`;
}

function displayTemperature (response){
    
    let temperatureElement = document.querySelector("#city-temperature-value");
    let cityElement = document.querySelector("#main-city");
    let descriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind-speed");
    let pressureElement = document.querySelector("#pressure");
    let feelsLikeElement = document.querySelector("#feels-like");
    let dateElement = document.querySelector("#current-date");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    console.log(response.data);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    pressureElement.innerHTML = response.data.main.pressure;
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
    dateElement.innerHTML = formatDate();
}

function search (city){
    let apiKey = "ed0b705eed2cc81cd6b87bb194b4d152";
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    
    axios.get(apiUrl).then(displayTemperature);
    
}

function handleSubmit (event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-bar");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature (event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#city-temperature-value");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
   
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature (event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#city-temperature-value");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function showLocation (position){
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    let apiKey = "ed0b705eed2cc81cd6b87bb194b4d152";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function searchLocation(){
    navigator.geolocation.getCurrentPosition(showLocation);
}

let celciusTemperature = null;

let form = document.querySelector("#city-info");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let currentLocationTemperature = document.querySelector("#current-location-button");
currentLocationTemperature.addEventListener("click", searchLocation);

search("Barcelona");