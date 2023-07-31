function localCityWeather(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=cbc2508db8ce71927b5728c130e5af89`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let cityName = data.name;
      let temperature = Math.round(data.main.temp);
      let weatherDescription = data.weather[0].description;
      // console.log(weatherDescription);
      let winSpeed = Math.round(data.wind.speed);
      // console.log(data);
      function localCityTemp(local) {
        local.preventDefault();
        let h2 = document.querySelector("h2");
        h2.innerHTML = `Currently in ${cityName}`;

        let temp = document.querySelector("#temp");
        temp.innerHTML = `${temperature}`;
        let description = document.querySelector("#weatherDescription");
        description.innerHTML = `${weatherDescription}`;
        description.textContent = weatherDescription;
        let wind = document.querySelector("#win");
        wind.innerHTML = `Wind:${winSpeed} m/s`;
        let humidity = document.querySelector("#hum");
        humidity.innerHTML = `Humidity:${data.main.humidity}%`;
      }

      let currentLocButton = document.querySelector("#currentLoc");
      currentLocButton.addEventListener("click", localCityTemp);
    });
  navigator.geolocation.getCurrentPosition(localCityWeather);

  function currentDayTime() {
    let now = new Date();
    let options = { weekday: "long" };
    let day = now.toLocaleString("en-US", options);
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");

    let currentTime = `${day} ${hours}:${minutes}`;

    document.querySelector("#current-time").textContent = currentTime;
  }
}

navigator.geolocation.getCurrentPosition(localCityWeather);

function currentDayTime() {
  let now = new Date();
  let options = { weekday: "long" };
  let day = now.toLocaleString("en-US", options);
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let currentTime = `${day} ${hours}:${minutes}`;

  document.querySelector("#current-time").textContent = currentTime;
}

currentDayTime();
function submittedCityWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cbc2508db8ce71927b5728c130e5af89&units=metric&dt=UTC`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let temperature = Math.round(data.main.temp);
      let windSpeed = Math.round(data.wind.speed);
      let weatherDescription = data.weather[0].description;
      let temp = document.querySelector("#temp");
      temp.innerHTML = `${temperature}`;
      let weatherDes = document.querySelector("#weatherDescription");
      weatherDes.innerHTML = `${weatherDescription}`;

      let wind = document.querySelector("#win");
      wind.innerHTML = `Wind: ${windSpeed} m/s`;
      let humidity = document.querySelector("#hum");
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    })
    .catch((error) => {
      console.log("Error:", error);
      alert("An error occurred while fetching the weather data.");
    });
}

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = document.querySelector("#city-name");
  cityName.textContent = `Currently in ${searchInput.value}`;
  submittedCityWeather(searchInput.value);
  let capitalizedCityName =
    searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);

  cityName.textContent = `Currently in ${capitalizedCityName}`;
  submittedCityWeather(searchInput.value);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", submitCity);

let tempElement = document.getElementById("temp");
let celsiusButton = document.getElementById("celsius");
let fahrenheitButton = document.getElementById("fahrenheit");

fahrenheitButton.addEventListener("click", function () {
  tempElement.textContent = "70";
});

celsiusButton.addEventListener("click", function () {
  tempElement.textContent = `21`;
});
