function displayTemperature(response) {
  console.log(response);
  console.log(response.data.temperature.current);
  let tempEl = document.querySelector("#temperature");
  let feelsEl = document.querySelector("#feels-like");
  let cityEl = document.querySelector("#city");
  let descEl = document.querySelector("#description");
  let humidityEl = document.querySelector("#humidity");
  let windEl = document.querySelector("#wind");

  cityEl.innerHTML = response.data.city;
  tempEl.innerHTML = Math.round(response.data.temperature.current);
  feelsEl.innerHTML = Math.round(response.data.temperature.feels_like);
  descEl.innerHTML = response.data.condition.description;
  humidityEl.innerHTML = response.data.temperature.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
}
let apikey = "1o0f4aea9af54436031a3t4f3b2ca21f";
let units = "metric";
let city = "New York";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=${units}`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
