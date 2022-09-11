
# Weather Dashboard

This project includes a simple weather dashboard for any city in the United States.

The user has the ability to get weather data for a city of their choice by completing and submitting a form. The user can revisit their 3 most recent choices by clicking on one of the buttons below the form for quick access.

Each query will provide the forecast for the closest upcoming hour, as well as a 5-day forecast. Data includes temperature, humidity, wind speed, as well as an icon that corresponds with the forecast.


Languages/Libraries used:
-
HTML
JavaScript
jQuery
Moment.js
CSS


## Authors

- [@noothanks](https://www.github.com/noothanks)


## Deployment

This project is currently deployed on GitHub Pages at the following link:
https://noothanks.github.io/workday-scheduler/


## Lessons Learned

This project required the use of 2 server-side Apis (OpenWeather and Geoapify). Geoapify was used to get the coordinates of the requested city, they could be passed into OpenWeather's Api.

The localStorage web API was also used in order to save the user's 3 most recent forecast queries. This data is cycled through to replace old city names with the new search term and update each button accordingly.



## Screenshots

![image](./screenshot.jpg)
