var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var stateInputEl = document.querySelector("#state");
var forecastContainerEl = document.querySelector("#forecast-container");
var citySearchTermEl = document.querySelector("#city-search-term");

var btn1El = document.querySelector('#btn1')
var btn2El = document.querySelector('#btn2')
var btn3El = document.querySelector('#btn3')

var day;
var month;
var year;

var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
    forecastContainerEl.innerHTML = ''
    // get value from input element
    var city = cityInputEl.value.trim();
    var state = stateInputEl.value.trim();

    console.log(city);
    console.log(state);
    if (city && state) {
      getCityCoordinates(city, state);
      setHistory(city, state);
      // clear old content
      forecastContainerEl.textContent = "";
      cityInputEl.value = "";
      stateInputEl.value="";
    } else {
      alert("Please enter a city and state");
    }
  };
  
var getCityCoordinates = function(city, state) {

  var apiUrl = `https://api.geoapify.com/v1/geocode/search?city=${city}&state=${state}&apiKey=5819c74370cc4f6191a75acaebd01318`

  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        // console.log(response);
        response.json().then(function(data) {

          var lat = data.features[0].properties.lat;
          var lon = data.features[0].properties.lon;

          getCityForecast(lat, lon);
        })
      } else {
        alert('Error: City not found')
      }
    })
    .catch(function(error) {
      alert('Unable to connect to geoapify');
    })
}

  var getCityForecast = function(lat, lon) {
    // format the OpenWeather api url
    console.log(lat, lon)
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=4b57b78a460de691408ef8d22e4b95b9`
  
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            var city = data.city.name

            var currentWeather = {
              weatherCode: data.list[0].weather[0].id,
              conditions: data.list[0].weather[0].description,
              iconUrl: "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png",

              windDirection: data.list[0].wind.deg,
              windSpeed: data.list[0].wind.speed,
              windGusts: data.list[0].wind.gust,
              
              temp: data.list[0].main.temp,
              humidity: data.list[0].main.humidity
            }
            console.log(currentWeather);

            var forecast = {
              nextDay: {
                weatherCode: data.list[8].weather[0].id,
                iconUrl: "http://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png",

                temp: data.list[8].main.temp,
                humidity: data.list[8].main.humidity,

                windSpeed: data.list[8].wind.speed
              },
              nextDay2: {
                weatherCode: data.list[16].weather[0].id,
                iconUrl: "http://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png",

                temp: data.list[16].main.temp,
                humidity: data.list[16].main.humidity,

                windSpeed: data.list[16].wind.speed
              },
              nextDay3: {
                weatherCode: data.list[24].weather[0].id,
                iconUrl: "http://openweathermap.org/img/w/" + data.list[24].weather[0].icon + ".png",

                temp: data.list[24].main.temp,
                humidity: data.list[24].main.humidity,

                windSpeed: data.list[24].wind.speed
              },
              nextDay4: {
                weatherCode: data.list[32].weather[0].id,
                iconUrl: "http://openweathermap.org/img/w/" + data.list[32].weather[0].icon + ".png",

                temp: data.list[32].main.temp,
                humidity: data.list[32].main.humidity,

                windSpeed: data.list[32].wind.speed
              },
              nextDay5: {
                weatherCode: data.list[39].weather[0].id,
                iconUrl: "http://openweathermap.org/img/w/" + data.list[39].weather[0].icon + ".png",

                temp: data.list[39].main.temp,
                humidity: data.list[39].main.humidity,

                windSpeed: data.list[39].wind.speed
              }
            } 
            displayForecast(city, currentWeather, forecast, getDate() );
          });
        } else {
          alert('Error: City Not Found');
        }
      })
      .catch(function(error) {
        alert("Unable to connect to OpenWeather");
      });
  };

  var getDate = function() {
    var dateObj = new Date();

    var date = {
      day: dateObj.getDate(),
      month: dateObj.getMonth() + 1,
      year: dateObj.getFullYear()
    }
    return date
  }

  var displayForecast = function(city, currentWeather, forecast) {  
    // check if api returned any repos
        if (!city || !currentWeather ) {
          forecastContainerEl.textContent = "No forecast available. Please try again";
          return;
        } else {
          var date = getDate();
          //set results header to ciy name and current date
          citySearchTermEl.innerHTML =  `${city} ${date.month}/${date.day}/${date.year}`;

          //create element for icon and add it to the results header
          var iconEl = document.createElement('img');
          iconEl.setAttribute("src", currentWeather.iconUrl);
          citySearchTermEl.appendChild(iconEl);
    
          //create div for current weather data
          var currentWeatherEl = document.createElement('div');
          var tempEl = document.createElement('p');
          var windEl = document.createElement('p');
          var humidityEl = document.createElement('p');
    
          //set values for temp, wind speed, humidity
          tempEl.innerHTML = `Temp: ${currentWeather.temp} &deg F`;
          windEl.innerHTML = `Wind: ${currentWeather.windSpeed} MPH`;
          humidityEl.innerHTML = `Humidity: ${currentWeather.humidity}%`
    
          //add to div
          currentWeatherEl.appendChild(tempEl);
          currentWeatherEl.appendChild(windEl);
          currentWeatherEl.appendChild(humidityEl);
    
          //add div to container
          forecastContainerEl.appendChild(currentWeatherEl);


          //create div for each card
          var nextDayEl = document.createElement('div');
          var nextDay2El = document.createElement('div');
          var nextDay3El = document.createElement('div');
          var nextDay4El = document.createElement('div');
          var nextDay5El = document.createElement('div');

          nextDayEl.className = 'card'
          nextDay2El.className = 'card'
          nextDay3El.className = 'card'
          nextDay4El.className = 'card'
          nextDay5El.className = 'card'

          //create header for each div
          var nextDayH = document.createElement('h4');
          var nextDayH2 = document.createElement('h4');
          var nextDayH3 = document.createElement('h4');
          var nextDayH4 = document.createElement('h4');
          var nextDayH5 = document.createElement('h4');

          nextDayH.className = 'card-header'
          nextDayH2.className = 'card-header'
          nextDayH3.className = 'card-header'
          nextDayH4.className = 'card-header'
          nextDayH5.className = 'card-header'

          //set header value to corresponding date
          nextDayH.innerHTML = `(${date.month}/${date.day + 1}/${date.year})`;
          nextDayH2.innerHTML = `(${date.month}/${date.day + 2}/${date.year})`;
          nextDayH3.innerHTML = `(${date.month}/${date.day + 3}/${date.year})`;
          nextDayH4.innerHTML = `(${date.month}/${date.day + 4}/${date.year})`;
          nextDayH5.innerHTML = `(${date.month}/${date.day + 5}/${date.year})`;

          //create header iconEl
          var nextDayIconEl = document.createElement('img')
          nextDayIconEl.setAttribute('src', forecast.nextDay.iconUrl)

          var nextDay2IconEl = document.createElement('img')
          nextDay2IconEl.setAttribute('src', forecast.nextDay2.iconUrl)
          
          var nextDay3IconEl = document.createElement('img')
          nextDay3IconEl.setAttribute('src', forecast.nextDay3.iconUrl)
          
          var nextDay4IconEl = document.createElement('img')
          nextDay4IconEl.setAttribute('src', forecast.nextDay4.iconUrl)
          
          var nextDay5IconEl = document.createElement('img')
          nextDay5IconEl.setAttribute('src', forecast.nextDay5.iconUrl)

          //append icon to header
          nextDayH.appendChild(nextDayIconEl);
          nextDayH2.appendChild(nextDay2IconEl);
          nextDayH3.appendChild(nextDay3IconEl);
          nextDayH4.appendChild(nextDay4IconEl);
          nextDayH5.appendChild(nextDay5IconEl);

          //append header to card
          nextDayEl.appendChild(nextDayH);
          nextDay2El.appendChild(nextDayH2);
          nextDay3El.appendChild(nextDayH3);
          nextDay4El.appendChild(nextDayH4);
          nextDay5El.appendChild(nextDayH5);

          //create forecast tempEl
          var nextDayTempEl = document.createElement('p');
          var nextDay2TempEl = document.createElement('p');
          var nextDay3TempEl = document.createElement('p');
          var nextDay4TempEl = document.createElement('p');
          var nextDay5TempEl = document.createElement('p');

          //set temp to corresponding day
          nextDayTempEl.innerHTML = `Temp: ${forecast.nextDay.temp} &deg F`;
          nextDay2TempEl.innerHTML =`Temp: ${forecast.nextDay.temp} &deg F`;
          nextDay3TempEl.innerHTML = `Temp: ${forecast.nextDay.temp} &deg F`;
          nextDay4TempEl.innerHTML = `Temp: ${forecast.nextDay.temp} &deg F`;
          nextDay5TempEl.innerHTML = `Temp: ${forecast.nextDay.temp} &deg F`;

          //append temp to card
          nextDayEl.appendChild(nextDayTempEl);
          nextDay2El.appendChild(nextDay2TempEl);
          nextDay3El.appendChild(nextDay3TempEl);
          nextDay4El.appendChild(nextDay4TempEl);
          nextDay5El.appendChild(nextDay5TempEl);

          //create forecast windEl
          var nextDayWindEl = document.createElement('p');
          var nextDay2WindEl = document.createElement('p');
          var nextDay3WindEl = document.createElement('p');
          var nextDay4WindEl = document.createElement('p');
          var nextDay5WindEl = document.createElement('p');

          //set wind speed to corresponding day
          nextDayWindEl.innerHTML = `Wind: ${forecast.nextDay.windSpeed} MPH`;
          nextDay2WindEl.innerHTML = `Wind: ${forecast.nextDay2.windSpeed} MPH`;
          nextDay3WindEl.innerHTML = `Wind: ${forecast.nextDay3.windSpeed} MPH`;
          nextDay4WindEl.innerHTML = `Wind: ${forecast.nextDay4.windSpeed} MPH`;
          nextDay5WindEl.innerHTML = `Wind: ${forecast.nextDay5.windSpeed} MPH`;

          //append wind to card
          nextDayEl.appendChild(nextDayWindEl);
          nextDay2El.appendChild(nextDay2WindEl);
          nextDay3El.appendChild(nextDay3WindEl);
          nextDay4El.appendChild(nextDay4WindEl);
          nextDay5El.appendChild(nextDay5WindEl);

          //create forecast windEl
          var nextDayHumidityEl = document.createElement('p');
          var nextDay2HumidityEl = document.createElement('p');
          var nextDay3HumidityEl = document.createElement('p');
          var nextDay4HumidityEl = document.createElement('p');
          var nextDay5HumidityEl = document.createElement('p');

          //set humidity to corresponding day
          nextDayHumidityEl.innerHTML = `Humidity: ${forecast.nextDay.humidity}%`;
          nextDay2HumidityEl.innerHTML = `Humidity: ${forecast.nextDay2.humidity}%`;
          nextDay3HumidityEl.innerHTML = `Humidity: ${forecast.nextDay3.humidity}%`;
          nextDay4HumidityEl.innerHTML = `Humidity: ${forecast.nextDay4.humidity}%`;
          nextDay5HumidityEl.innerHTML = `Humidity: ${forecast.nextDay5.humidity}%`;
          
          //append humidity to div
          nextDayEl.appendChild(nextDayHumidityEl);
          nextDay2El.appendChild(nextDay2HumidityEl);
          nextDay3El.appendChild(nextDay3HumidityEl);
          nextDay4El.appendChild(nextDay4HumidityEl);
          nextDay5El.appendChild(nextDay5HumidityEl);

          //append card to div
          forecastContainerEl.appendChild(nextDayEl);
          forecastContainerEl.appendChild(nextDay2El);
          forecastContainerEl.appendChild(nextDay3El);
          forecastContainerEl.appendChild(nextDay4El);
          forecastContainerEl.appendChild(nextDay5El);

    }
  }

  var getHistory = function() {
    db = JSON.parse(localStorage.getItem('cityHistory')) || []
    return db
  }

  var setHistory = function(city, state) {
    var cityHistory = getHistory();
    if(!cityHistory) {
      var cityHistory = [];
      cityHistory.push(
        {
          city: city,
          state: state
        }
      )
  
      localStorage.setItem('cityHistory', JSON.stringify(cityHistory))
      setButtons();
    }
    if(cityHistory.length < 3) {
      cityHistory.push(
        {
          city: city,
          state: state
        }
      );


      localStorage.setItem('cityHistory', JSON.stringify(cityHistory))  
      setButtons();
    }
    if (cityHistory.length === 3) {
      
      cityHistory.shift();
      //cityHistory.shift();
      cityHistory.push(
        {
          city: city,
          state: state
        }
      )
      //cityHistory.reverse();

      localStorage.setItem('cityHistory', JSON.stringify(cityHistory))
      setButtons();
    }
    //getHistory
    //JSON.parse
    //shift and push
    //loop
    //get btn el and set text
    //set
  }

var setButtons = function() {
  var cityHistory = getHistory();
  console.log(cityHistory);
  
  if(cityHistory === []) {
    btn1El.innerHTML = ''
    btn2El.innerHTML = ''
    btn3El.innerHTML = ''
  } else if (cityHistory.length === 1) {
    btn1El.innerHTML = `${cityHistory[0].city}`;
    btn2El.innerHTML = ''
    btn3El.innerHTML = ''
  }  else if (cityHistory.length === 2) {
    btn1El.innerHTML = `${cityHistory[1].city}`;
    btn2El.innerHTML = `${cityHistory[0].city}`;
    btn3El.innerHTML = ''
  } else if (cityHistory.length === 3){
    btn1El.innerHTML =`${cityHistory[2].city}`;
    btn2El.innerHTML =`${cityHistory[1].city}`;
    btn3El.innerHTML =`${cityHistory[0].city}`;
  }

}

var buttonClickHandler = function(event) {
  var cityHistory = getHistory();
  // get the city attribute from the clicked element
  if(cityHistory){
    var quickSelect = event.target.innerHTML
    forecastContainerEl.innerHTML = ''
    if(quickSelect === cityHistory[0].city) {
      console.log(event.target)
      getCityCoordinates(cityHistory[0].city, cityHistory[0].state);
    }

    if(quickSelect === cityHistory[1].city) {
      console.log(event.target)
      getCityCoordinates(cityHistory[1].city, cityHistory[1].state);
    }
    
    if(quickSelect === cityHistory[2].city) {
      console.log(event.target)
      getCityCoordinates(cityHistory[2].city, cityHistory[2].state);
    }
  }
};

 
setButtons();
// add event listeners to form and button container
cityFormEl.addEventListener("submit", formSubmitHandler);
btn1El.addEventListener("click", buttonClickHandler);
btn2El.addEventListener("click", buttonClickHandler);
btn3El.addEventListener("click", buttonClickHandler);