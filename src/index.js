// Replace city name with the input
// API icon implementation
// humidity and wind

function translateDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return daysOfTheWeek[date.getDay()];
}

// F O R E C A S T
// display weather for upcoming days
// using retrieved coordinates from API
function displayForecast(response) {
  console.log(response.data);
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML += `
          <div class="col-4 text-center">
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" />
            <br />
            <span class="week-temperature-max">${Math.round(
              day.temp.max
            )}°</span>  
            <span class="week-temperature-min">${Math.round(
              day.temp.min
            )}°</span>
            <br />
            <span class="days">${translateDay(day.dt)}</span>
          </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// get coords of the user-submitted city
// One Call API to get data
function getForecast(coordinates) {
  let apiKey = "7e77d603761c561231a7adb4e10379dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Information of user-submitted city is displayed on page
// including icon, description, speed, and humidity
function whatsTheWeather(response) {
  cTemp = response.data.main.temp;

  let roundedTemp = Math.round(cTemp);
  let headerElement = document.querySelector("#city-display");
  let temp = document.querySelector("#temp-now");
  let iconElement = document.querySelector(".icon-weather-main");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#hum");
  let windElement = document.querySelector("#wind");

  headerElement.innerHTML = response.data.name;
  temp.innerHTML = `${roundedTemp}°`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}

// Data for user-submitted city is retrieved from API
function search(inputCity) {
  let apiKey = "7e77d603761c561231a7adb4e10379dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(whatsTheWeather);
}

// User submits their a city
// Replace DOM with submitted city
function submitCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");

  inputCity.innerHTML = `${inputCity.value}`;
  search(inputCity.value);

  fLink.classList.remove("active-link");
  cLink.classList.add("active-link");
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

  fLink.classList.remove("active-link");
  cLink.classList.add("active-link");
}

//////////////

// ɢᴇᴛ ᴛɪᴍᴇ

function whatTimeIsIt() {
  let now = new Date();

  let hour = now.getHours();
  let minutes = now.getMinutes();
  let timeDay = "AM";

  if (hour == 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour -= 12;
    timeDay = "PM";
  }

  if (hour < 10 || hour > 12) {
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
  currentTime.innerHTML = `${hour}:${minutes} ${timeDay}`;
}

whatTimeIsIt();

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
// displayForecast();
