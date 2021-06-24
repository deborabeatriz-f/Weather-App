// DATE and TIME
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// DISPLAY FORECAST - NEXT DAYS
function displayForecast(response) {
  let forecast = response.data.daily;

  let otherDays = document.querySelector(".otherForecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
      <div class="card-body">
          <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
          <p class="card-text">
            <span class="maxTemp">
              <strong>${Math.round(forecastDay.temp.max)}°C
              </strong></span>
              <span class="minimTemp">/${Math.round(forecastDay.temp.min)}°C
              </span></p>
          <img src="./img/${forecastDay.weather[0].id}.png"
          alt=""/>
        </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  otherDays.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4620cdf98d4514231f7fef13652555c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// DISPLAY CITY & TEMPERATURE
function displayTemperature(response) {
  let temperature = document.querySelector("#theTemperature");
  let city = document.querySelector("#theCity");
  let description = document.querySelector("#forecast");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let icon = document.querySelector("#tempImg");

  celciusTemperature = Math.round(response.data.main.temp);

  temperature.innerHTML = celciusTemperature;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute("src", `./img/${response.data.weather[0].id}.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4620cdf98d4514231f7fef13652555c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCityWeather(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#citySearch");
  search(searchCity.value);
}

let submitCity = document.querySelector("#mainSearch");
submitCity.addEventListener("submit", searchCityWeather);

search("New York");
