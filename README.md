# Weather App

A simple weather app using the Open Weather API

Live: https://weatherapp-arcan.netlify.app/

<img src="https://github.com/arcan9/My-Weather-App/blob/main/images/weather-app-capture.PNG" width="500">

# How it's Made

<strong>Tech used:</strong> HTML, CSS, Javascript, Bootstrap

Open Weather API: https://openweathermap.org/api

Dependencies: Axios library (make http request to interact with API)

Starting off with HTML and CSS: I first plugged in all the required information like the current day and weather, time, as well as the upcoming forecast. In the beginning these were all placeholder information, just enough to visual how everything is organized in the app's layout. Bootstrap helped with this, making it easier to insert cards and tables for the data, and work with buttons already setup by Bootstrap.

Next was Javascript, using time and day retrieval methods to get the current time. Stored the API key and URL in the code and have axios access the features of the Open Weather API to retrieve weather conditions using city coordinates and geolocation. Default location is Los Angeles. Default temperature is shown as celsius but a function in the code allows for fahrenheit conversion, which the user can do with one click.

# What I learned

I learned that almost everything can be a function! While the code itself might not be as "clean" as it could be, refactoring things into functions or even leaving comments really helped me to stay organized and make the code more readable. I learned about API integration, the use of axios library, and that it's possible to insert HTML into Javascipt. I learned how to access certain information from the object in the API URL, 

example: <strong>console.log(response.data.main.temp)</strong> for the temperature

Most of all, I learned that no matter how long it took me to figure things out, it was never a dull moment. Frustrating at times, yes, but always rewarding when you get something to finally work. Plus, I think my Google search skills have leveled up now, too.
