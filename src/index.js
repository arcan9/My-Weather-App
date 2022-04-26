//challenge 1, Add current time
let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

//create array here
let daysOfTheWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = daysOfTheWeek[now.getDay()];

let currentDay = document.querySelector("#day-now");
let currentTime = document.querySelector(".time-now");
currentDay.innerHTML = `${day}`;
currentTime.innerHTML = `${hour}:${minutes}`;

//challenge 2, Replace city name with the input

function whatsTheWeather(response) {
  let headerElement = document.querySelector("#city-display");
  let roundedTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp-now");
  headerElement.innerHTML = response.data.name;
  temp.innerHTML = `${roundedTemp}°`;
}

function search(inputCity) {
  let apiKey = "7e77d603761c561231a7adb4e10379dd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(whatsTheWeather);
}

function submitCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  inputCity.innerHTML = `${inputCity.value}`;
  // let headerElement = document.querySelector("#city-display");
  // headerElement.innerHTML = `${currentCity.value}`;
  search(inputCity.value);
}

let getWeather = document.querySelector("#search-form");
getWeather.addEventListener("submit", submitCity);

//challenge 3 celsius to fahrenheit and vice versa

// function convertToCelcius() {
//   let temp = document.querySelector("#temp-now");
//   temp.innerHTML = "19°";
// }

// let cTemp = document.querySelector("#celcius");
// cTemp.addEventListener("click", convertToCelcius);

// function convertToFahrenheit() {
//   let temp = document.querySelector("#temp-now");
//   temp.innerHTML = "67°";
// }

// let fTemp = document.querySelector("#fahrenheit");
// fTemp.addEventListener("click", convertToFahrenheit);

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

let button = document.querySelector("#location-button");
button.addEventListener("click", getCurrentPosition);

search("Los Angeles");
