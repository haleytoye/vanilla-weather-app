function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tu", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastData = response.data.daily;

  let forecastEl = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `       
      <div class="col-2">
                <div class="forecast-date">
                  ${formatDay(forecastDay.time)}
                  <img
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.condition.icon
                    }.png"
                    id="icon"
                    alt=""
                    width="50"
                  />
                  <div class="forecast-temp">
                    <span class="forecast-temp-max"> ${Math.round(
                      forecastDay.temperature.maximum
                    )}° </span>
                    <span class="forecast-temp-min"> ${Math.round(
                      forecastDay.temperature.minimum
                    )}°</span>
                  </div>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastEl.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = "1o0f4aea9af54436031a3t4f3b2ca21f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let tempEl = document.querySelector("#temperature");
  let feelsEl = document.querySelector("#feels-like");
  let cityEl = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  let descEl = document.querySelector("#description");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let dateEl = document.querySelector("#date");
  let iconEl = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;
  cityInput.value = "";
  cityEl.innerHTML = response.data.city;
  tempEl.innerHTML = Math.round(response.data.temperature.current);
  feelsEl.innerHTML = Math.round(response.data.temperature.feels_like);
  descEl.innerHTML = response.data.condition.description;
  humidityEl.innerHTML = response.data.temperature.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);

  dateEl.innerHTML = formatDate(response.data.time * 1000);
  iconEl.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconEl.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apikey = "1o0f4aea9af54436031a3t4f3b2ca21f";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputEl = document.querySelector("#city-input");
  console.log(cityInputEl.value);
  search(cityInputEl.value);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("London");
