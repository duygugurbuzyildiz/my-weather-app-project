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

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function formatHour(timestamp){
    let time = new Date(timestamp * 1000);
    let hours = time.getHours();

    if (hours < 10){

    return `0${hours}:00`;
    }
    else {
        return `${hours}:00`
    }
}

function formatSunRiseAndSet(timestamp){
    let time = new Date (timestamp * 1000);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    if (hours < 10){
    hours = `0${hours}`;
    }

    return `${hours}:${minutes}`;

}

function displayForecast(response) {
    console.log(response.data);
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row g-3 mt-2" style="text-align: center;">`;

    forecast.forEach(function (forecastDay, index){
        
        if (index < 6){

            let tempMax = Math.round(forecastDay.temp.max);
            let tempMin = Math.round (forecastDay.temp.min);
            
            forecastHTML = forecastHTML +
            `<div class="col-2">
                <div class="forecastDate">
                ${formatDay(forecastDay.dt)}
                </div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/>
                <div class="forecastTemperature">
                    <span class="weather-forecast-temperature-max">${tempMax}</span>ºC   
                    <span class="weather-forecast-temperature-min">${tempMin}</span>ºC
                </div>
            </div>
            `;

        }

    });

    forecastHTML = forecastHTML +`</div>`;
    forecastElement.innerHTML = forecastHTML;

    let hourlyElement = response.data.hourly;

    let forecastHourlyElement = document.querySelector("#forecast-hourly");

    let forecastHourlyHTML = `<div class="row">`;

    hourlyElement.forEach(function(forecastHour, index){
        if (index < 12){
            
            forecastHourlyHTML = forecastHourlyHTML + 
            `
                <div class="col-1" style="text-align: center;" id="hourly-temperature">
                    <div class="temperature-value-hourly" id="temperature-hourly">${Math.round(forecastHour.temp)}ºC</div>
                        <img src="http://openweathermap.org/img/wn/${forecastHour.weather[0].icon}@2x.png" alt="" width="35"/>
                        <div class="hourlyTime" id="hourly-time">${formatHour(forecastHour.dt)}</div>
                </div>
            `;
        }
    });
    
    forecastHourlyHTML = forecastHourlyHTML + `</div>`;
    forecastHourlyElement.innerHTML = forecastHourlyHTML;

}

function getForecast (coordinates){
    let apiKey = "ed0b705eed2cc81cd6b87bb194b4d152";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

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
    let iconElement = document.querySelector("#main-city-icon");
    let sunRiseElement = document.querySelector("#sun-rise");
    let sunSetElement = document.querySelector("#sun-set");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    pressureElement.innerHTML = response.data.main.pressure;
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
    dateElement.innerHTML = formatDate();
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    sunRiseElement.innerHTML = formatSunRiseAndSet(response.data.sys.sunrise);
    sunSetElement.innerHTML = formatSunRiseAndSet(response.data.sys.sunset);
    
    getForecast (response.data.coord);

    let backgroundImg = document.querySelector("#top-page");

    if (response.data.weather[0].icon === `01d`| response.data.weather[0].icon === `02d`|response.data.weather[0].icon === `01n`| response.data.weather[0].icon === `02n`){
        backgroundImg.style.backgroundImage="url('img/sunny.jpeg')";
    }
    if (response.data.weather[0].icon === `03d`| response.data.weather[0].icon === `04d`|response.data.weather[0].icon === `03n`| response.data.weather[0].icon === `04n`){
        backgroundImg.style.backgroundImage="url('img/clouds.jpeg')";
    }
    if (response.data.weather[0].icon === `09d`| response.data.weather[0].icon === `10d`|response.data.weather[0].icon === `09n`| response.data.weather[0].icon === `10n`){
        backgroundImg.style.backgroundImage="url('img/rain.jpeg')";
    }
    if (response.data.weather[0].icon === `11d`| response.data.weather[0].icon === `11n`){
        backgroundImg.style.backgroundImage="url('img/thunder.jpeg')";
    }
    if (response.data.weather[0].icon === `13d`| response.data.weather[0].icon === `13n`){
        backgroundImg.style.backgroundImage="url('img/snow.jpeg')";
    }
    if (response.data.weather[0].icon === `50d`| response.data.weather[0].icon === `50n`){
        backgroundImg.style.backgroundImage="url('img/foggy.jpeg')";
    }
}

function search (city){
    let apiKey = "ed0b705eed2cc81cd6b87bb194b4d152";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    
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