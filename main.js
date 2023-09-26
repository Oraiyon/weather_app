const fahrenheit = document.querySelector("#fahrenheit");
const celsius = document.querySelector("#celsius");
const searchBar = document.querySelector(".searchBar");
const submit = document.querySelector(".submit");
const area = document.querySelector(".area");
const weatherIcon = document.querySelector(".weatherIcon");
const currentWeather = document.querySelector(".currentWeather");
const currentTemp = document.querySelector(".currentTemp");
const rain = document.querySelector(".rain");
const snow = document.querySelector(".snow");
const futureDay = document.querySelectorAll(".futureDay");
const futureWeatherIcons = document.querySelectorAll(".futureWeatherIcon");

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

const displayRainAndSnow = (place) => {
  if (place.forecast.forecastday[0].day.daily_chance_of_rain > 0) {
    rain.innerText = `Chance Of Rain: ${place.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  }
  if (place.forecast.forecastday[0].day.daily_chance_of_snow > 0) {
    snow.innerText = `Chance Of Snow: ${place.forecast.forecastday[0].day.daily_chance_of_snow}%`;
  }
};

const switchMeasurements = (place) => {
  fahrenheit.addEventListener("click", () => {
    currentTemp.innerText = `${place.current.temp_f} °F`;
  });
  celsius.addEventListener("click", () => {
    currentTemp.innerText = `${place.current.temp_c} °C`;
  });
};

const displayNextDays = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date().getDay();
  futureDay.forEach((day, index) => {
    const dayOfWeek = days[today + index + 1];
    day.innerText = dayOfWeek;
  });
};

const displayNextWeathers = (place) => {
  futureWeatherIcons.forEach((icon, index) => {
    icon.src = place.forecast.forecastday[index].day.condition.icon;
  });
};

const displayInfo = (place) => {
  displayArea(place);
  displayWeatherIcon(place);
  displayCurrentWeather(place);
  displayCurrentTemp(place);
  displayRainAndSnow(place);
  switchMeasurements(place);
  displayNextDays();
  displayNextWeathers(place);
};

const fetchWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f4c93d4e6e0043c29fe45029232209&days=4&q=${location}`,
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
