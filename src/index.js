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
function displayTemperature(response) {
  console.log(response);
  console.log(response.data.temperature.current);
  let tempEl = document.querySelector("#temperature");
  let feelsEl = document.querySelector("#feels-like");
  let cityEl = document.querySelector("#city");
  let descEl = document.querySelector("#description");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");
  let dateEl = document.querySelector("#date");

  cityEl.innerHTML = response.data.city;
  tempEl.innerHTML = Math.round(response.data.temperature.current);
  feelsEl.innerHTML = Math.round(response.data.temperature.feels_like);
  descEl.innerHTML = response.data.condition.description;
  humidityEl.innerHTML = response.data.temperature.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);

  dateEl.innerHTML = formatDate(response.data.time * 1000);
}
let apikey = "1o0f4aea9af54436031a3t4f3b2ca21f";
let units = "metric";
let city = "New York";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=${units}`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
