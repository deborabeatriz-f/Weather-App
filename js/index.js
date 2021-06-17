// DATE and TIME
let now = new Date();
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
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let time = document.querySelector("#date");
time.innerHTML = `${day} ${hour}:${minute}`;

// DISPLAY TEMPERATURE

function displayTemperature(response) {
  let temperature = document.querySelector("#theTemperature");
  let city = document.querySelector("#theCity");
  let description = document.querySelector("#forecast");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let icon = document.querySelector("#tempImg");

  displayForecast();

  celciusTemperature = Math.round(response.data.main.temp);

  temperature.innerHTML = celciusTemperature;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}
let apiKey = "4620cdf98d4514231f7fef13652555c7";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

// CITY and WEATHER SEARCH

function searchWeather(response) {
  document.querySelector("#theCity").innerHTML = response.data.name;
  document.querySelector("#theTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#forecast").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = document.querySelector("#tempImg");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function searchCityWeather(event) {
  event.preventDefault();
  let apiKey = "4620cdf98d4514231f7fef13652555c7";
  let searchCity = document.querySelector("#citySearch").value;
  let units = "metric";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPoint}?q=${searchCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(searchWeather);
}
let submitCity = document.querySelector("#mainSearch");
submitCity.addEventListener("submit", searchCityWeather);

// TEMPERATURE - Celcius and Fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = celciusTemperature * 1.8 + 32;
  let temperature = document.querySelector("#theTemperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)}`;
}
let fahrenheitLink = document.querySelector("#fahrenheitTemp");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelciusTemperature(event) {
  event.preventDefault;
  let temperature = document.querySelector("#theTemperature");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = `${celciusTemperature}`;
}
let celciusLink = document.querySelector("#celciusTemp");
celciusLink.addEventListener("click", displayCelciusTemperature);

let cecliusTemperature = null;

// DISPLAY FORECAST - NEXT DAYS
function displayForecast() {
  let otherDays = document.querySelector(".otherForecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
      <div class="card bg-transparent">
      <div class="card-body">
          <h5 class="card-title">${day}</h5>
          <p class="card-text">
            <span class="maxTemp">
              <strong>22°C
              </strong></span>
              <span class="minimTemp">/13°C
              </span></p>
          <img src="https://img.icons8.com/color/50/000000/partly-cloudy-day--v2.png"/>
        </div>
        </div>
        </div>`;
  });

  otherDays.innerHTML = forecastHTML;
}
forecastHTML = forecastHTML + `</div>`;
