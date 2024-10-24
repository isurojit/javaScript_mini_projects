const API_KEY = "3713dd67be968e4f41a23b5e19f7f7b5";
const locationInput = document.querySelector("#locationInput");
const getWeatherBtn = document.querySelector("#getWeatherBtn");
const errorMsg = document.querySelector("#errorMessage");
const defaultCity = "Kolkata";

//get default city on load
window.onload = function () {
  getWeather(defaultCity);
};

getWeatherBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const city = locationInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City Not Found");
      }
      return response.json();
    })
    .then((data) => {
      errorMsg.classList.add("hidden");
      updateUI(data);
    })
    .catch((err) => {
      errorMsg.textContent = err.message;
      errorMsg.classList.remove("hidden");
      console.log("Error fetch Weather. ", err);
    });
}

function updateUI(data) {
  document.querySelector("#cityName").textContent = data.name;
  document.querySelector("#date").textContent = new Date().toLocaleDateString();

  document.querySelector("#temperature").textContent = `${Math.trunc(
    data.main.temp
  )}°C`;

  document.querySelector(
    "#weatherDescription"
  ).textContent = `${data.weather[0].description}`;

  document.querySelector("#humidity").textContent = `${Math.trunc(
    data.main.humidity
  )}--%`;

  document.querySelector("#pressure").textContent = `${Math.trunc(
    data.main.pressure
  )}-- hPa`;

  document.querySelector("#wind").textContent = `${Math.trunc(
    data.wind.speed
  )}-- m/s`;
  document.getElementById(
    "weatherIcon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
}
