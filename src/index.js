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

function submittedCityWeather(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cbc2508db8ce71927b5728c130e5af89&units=metric&dt=UTC`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let temperature = Math.round(data.main.temp);
      let windSpeed = Math.round(data.wind.speed);
      let weatherDescription = data.weather[0].description;
      let weatherIcon = data.weather[0].icon;
      let temp = document.querySelector("#temp");
      temp.innerHTML = `${temperature}`;
      let weatherDes = document.querySelector("#weatherDescription");
      weatherDes.innerHTML = `${weatherDescription}`;

      let iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`;
      let weatherIconDiv = document.querySelector("#weatherIcon");
      weatherIconDiv.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
  
      let wind = document.querySelector("#win");
      wind.innerHTML = `Wind: ${windSpeed} m/s`;
      let humidity = document.querySelector("#hum");
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
let timezoneOffset = data.timezone; // Timezone offset in seconds
    let now = new Date();
    let utcTime = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // Current UTC time
    let cityTime = new Date(utcTime + timezoneOffset * 1000); // Current city time

    let options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
    let currentTime = cityTime.toLocaleString("en-US", options);

    // Update the element with the ID "current-time"
    document.querySelector("#current-time").textContent = currentTime;

    })
    .catch((error) => {
      console.log("Error:", error);
      alert("An error occurred while fetching the weather data.");
    });
}