const fahrenheit = document.querySelector("#fahrenheit");
const celsius = document.querySelector("#celsius");
const searchBar = document.querySelector(".searchBar");
const submit = document.querySelector(".submit");
const area = document.querySelector(".area");
const weatherIcon = document.querySelector(".weatherIcon");
const currentWeather = document.querySelector(".currentWeather");
const currentTemp = document.querySelector(".currentTemp");
const precipitation = document.querySelector(".precipitation");

const displayArea = (place) => {
  const name = place.location.name;
  const country = place.location.country;
  area.innerText = `${name}, ${country}`;
};

const displayCurrentWeather = (place) => {
  currentWeather.innerText = place.current.condition.text;
};

const displayWeatherIcon = (place) => {
  weatherIcon.src = place.current.condition.icon;
};

const displayCurrentTemp = (place) => {
  currentTemp.innerText = `${place.current.temp_f} °F`;
};

const displayPrecipitation = (place) => {
  precipitation.innerText = `Precip: ${place.current.precip_in} in`;
};

const switchMeasurements = (place) => {
  fahrenheit.addEventListener("click", () => {
    currentTemp.innerText = `${place.current.temp_f} °F`;
    precipitation.innerText = `Precip: ${place.current.precip_in} in`;
  });
  celsius.addEventListener("click", () => {
    currentTemp.innerText = `${place.current.temp_c} °C`;
    precipitation.innerText = `Precip: ${place.current.precip_mm} mm`;
  });
};

const displayInfo = (place) => {
  displayArea(place);
  displayWeatherIcon(place);
  displayCurrentWeather(place);
  displayCurrentTemp(place);
  displayPrecipitation(place);
  switchMeasurements(place);
};

const fetchWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=f4c93d4e6e0043c29fe45029232209&q=${location}`,
    );
    const weatherData = await response.json();
    console.log(weatherData);
    displayInfo(weatherData);
  } catch (error) {
    console.log("ERROR", error);
  }
};

submit.addEventListener("click", () => {
  if (searchBar.value === "") {
    console.log("Enter Location");
  } else {
    fetchWeather(searchBar.value);
    searchBar.value = "";
  }
});
