// Replace city name with the input
// API icon implementation
// humidity and wind

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML += `
          <div class="col-3 text-center">
            <img src="http://openweathermap.org/img/wn/10d@2x.png" />
            <br />
            <span class="week-temperature-max">75°</span>  
            <span class="week-temperature-min">70°</span>
            <br />
            <span class="days">${day}</span>
          </div>`;
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function whatsTheWeather(response) {
  cTemp = response.data.main.temp;

  let roundedTemp = Math.round(cTemp);
  let headerElement = document.querySelector("#city-display");
  let temp = document.querySelector("#temp-now");
  let iconElement = document.querySelector(".icon-weather-main");
  let humidityElement = document.querySelector("#hum");
  let windElement = document.querySelector("#wind");

  headerElement.innerHTML = response.data.name;
  temp.innerHTML = `${roundedTemp}°`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
}

function search(inputCity) {
  let apiKey = "7e77d603761c561231a7adb4e10379dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(whatsTheWeather);
}

function submitCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");

  fLink.classList.remove("active-link");
  cLink.classList.add("active-link");

  inputCity.innerHTML = `${inputCity.value}`;
  search(inputCity.value);
}

// celsius to fahrenheit and vice versa

function convertToCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp-now");

  // remove the active class of fahrenheit link
  // add the active class to celsius link
  fLink.classList.remove("active-link");
  cLink.classList.add("active-link");

  temp.innerHTML = Math.round(cTemp) + "°";
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitNow = Math.round((cTemp * 9) / 5 + 32);

  // remove the active class of celsius link
  // add the active class to fahrenheit link
  cLink.classList.remove("active-link");
  fLink.classList.add("active-link");

  let temp = document.querySelector("#temp-now");
  temp.innerHTML = `${fahrenheitNow}°`;
}

function showMyCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7e77d603761c561231a7adb4e10379dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(whatsTheWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyCoords);
}

//////////////

// ɢᴇᴛ ᴛɪᴍᴇ

let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = daysOfTheWeek[now.getDay()];

let currentDay = document.querySelector("#day-now");
let currentTime = document.querySelector(".time-now");
currentDay.innerHTML = `${day}`;
currentTime.innerHTML = `${hour}:${minutes}`;

let cTemp = null;

let getWeather = document.querySelector("#search-form");
getWeather.addEventListener("submit", submitCity);

let cLink = document.querySelector("#celcius");
cLink.addEventListener("click", convertToCelcius);

let fLink = document.querySelector("#fahrenheit");
fLink.addEventListener("click", convertToFahrenheit);

let button = document.querySelector("#location-button");
button.addEventListener("click", getCurrentPosition);

// 🇩​​​​​🇪​​​​​🇫​​​​​🇦​​​​​🇺​​​​​🇱​​​​​🇹​​​​​ 🇨​​​​​🇮​​​​​🇹​​​​​🇾​​​​​
search("Los Angeles");
displayForecast();
