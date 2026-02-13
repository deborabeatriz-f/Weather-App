// Language
let currentLanguage = "en";

function changeLanguage(lang) {
  currentLanguage = lang;

  document.querySelectorAll(".language-links button").forEach((btn) => {
    btn.classList.remove("active-lang");
  });

  const activeBtn = document.getElementById(`btn-${lang}`);
  if (activeBtn) {
    activeBtn.classList.add("active-lang");
  }

  // Updates HTML Texts
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.innerText = translations[lang][key];
    }
  });

  // Updates Inputs
  let cityInput = document.getElementById("citySearch");
  let searchBtn = document.getElementById("search");

  if (cityInput) cityInput.placeholder = translations[lang].searchPlaceholder;
  if (searchBtn) searchBtn.value = translations[lang].searchButton;

  // Upload Forecast To Translate API and Dates
  let cityElement = document.querySelector("#theCity");
  if (cityElement.innerHTML && cityElement.innerHTML !== "City Name") {
    search(cityElement.innerHTML);
  }
}

// Date and Time
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

  let days = translations[currentLanguage].days;
  let day = days[now.getDay()];
  return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = translations[currentLanguage].shortDays;

  return days[day];
}

// Display Forecast - Next Days
function displayForecast(response) {
  let forecast = response.data.list.filter(function (forecastObject) {
    return forecastObject.dt_txt.includes("12:00:00");
  });

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
              <strong>${Math.round(forecastDay.main.temp_max)}°C
              </strong></span>
              <span class="minimTemp">/${Math.round(
                forecastDay.main.temp_min
              )}°C
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
  let apiKey = CONFIG.API_KEY;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric&lang=${currentLanguage}`;
  axios.get(apiUrl).then(displayForecast);
}

// Display City & Temperature
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

function showErrorToast() {
  const toast = document.getElementById("errorToast");

  toast.innerText =
    translations[currentLanguage].cityNotFound || "City not found";

  toast.className = "toast-notification show";

  setTimeout(function () {
    toast.className = "toast-notification";
  }, 3000);
}

function search(city) {
  let apiKey = CONFIG.API_KEY;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${currentLanguage}`;

  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch(function (error) {
      showErrorToast();
    });
}

function searchCityWeather(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#citySearch");

  if (searchCity.value) {
    search(searchCity.value);
    searchCity.value = "";
  }
}

let submitCity = document.querySelector("#mainSearch");
submitCity.addEventListener("submit", searchCityWeather);

search("New York");

// Background Theme
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

themeToggle.addEventListener("change", function () {
  document.body.classList.toggle("bg-theme-1");
  document.body.classList.toggle("bg-theme-2");

  sunIcon.classList.toggle("hidden");
  moonIcon.classList.toggle("hidden");
});

// English Default
changeLanguage("en");
search("New York");
