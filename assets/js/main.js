const apiKey = "2223cc1570e6dd401901640fa755edc2";

const cityinput = document.querySelector("#city-input");
const searchButton = document.querySelector(".modal__head__button");
const initialCitysList = document.querySelector(".citys-grid__list");
const listItem = document.querySelectorAll(".citys-grid__list-item")
const modalCitysList = document.querySelector(".modal__citys-grid");
const cityName = document.querySelector(".city");
const cityCountry = document.querySelector(".country");
const temperature = document.querySelector("#temperature");
const weatherDescripton = document.querySelector(".description");
const weatherIcon = document.querySelector(".weather-icon");
const humidity = document.querySelector("#humidity-percent");
const wind = document.querySelector("#wind-speed");
const weatherContainer = document.querySelector(".weather-data");

function getCityValue(e) {
  e.preventDefault();

  const city = cityinput.value;
  showWeatherData(city);
}

function getSelectedCity() {

    const city = this.textContent.trim();
    showWeatherData(city);
}
async function showWeatherData(city) {
  const data = await getWeatherData(city);
  const flag = data.sys.country.toLowerCase();
  cityCountry.src = `./public/flagssvg/${flag}.svg`;
  cityName.textContent = data.name;
  temperature.textContent = data.main.temp;
  weatherDescripton.textContent = data.weather[0].description;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed}km/h`;
  weatherContainer.classList.remove("disable");
  modalCitysList.classList.add("disable");

  
}

async function getWeatherData(city) {
  const urlOpenWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const response = await fetch(urlOpenWeatherApi);
  const weatherData = await response.json();

  return weatherData;
}

async function getCountriesData() {
  const urlCountries =
    "https://raw.githubusercontent.com/JeremyPersing/countryflagsapi/master/countries.json";

  const response = await fetch(urlCountries);
  const countriesData = await response.json();
  return countriesData;
}

getCountriesData();

searchButton.addEventListener("click", getCityValue);

cityinput.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

listItem.forEach((listItem) => listItem.addEventListener("click", getSelectedCity))

//HOC0Dfkl6QPliW5tLPwA1nKjJqSW-lK2dQpVuKUJL3U