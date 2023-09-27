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
const futureTemp = document.querySelectorAll(".futureTemp");
const hourlyWeather = document.querySelector(".hourlyWeather");

// does not switch temps of hourlys
// see displayHourly()
const switchMeasurements = (place) => {
  fahrenheit.addEventListener("click", () => {
    currentTemp.innerText = `${place.current.temp_f} °F`;
    futureTemp.forEach((temp, index) => {
      temp.innerText = `${
        place.forecast.forecastday[index + 1].day.avgtemp_f
      } °F`;
    });
  });

  celsius.addEventListener("click", () => {
    currentTemp.innerText = `${place.current.temp_c} °C`;
    futureTemp.forEach((temp, index) => {
      temp.innerText = `${
        place.forecast.forecastday[index + 1].day.avgtemp_c
      } °C`;
    });
  });
};

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
    icon.src = place.forecast.forecastday[index + 1].day.condition.icon;
  });
};

const displayNextTemp = (place) => {
  futureTemp.forEach((temp, index) => {
    temp.innerText = `${
      place.forecast.forecastday[index + 1].day.avgtemp_f
    } °F`;
  });
};

// includes switching F to C as temp is in DOM element
const displayHourly = (place) => {
  const hoursArray = place.forecast.forecastday[0].hour;
  console.log(hoursArray);
  hoursArray.forEach((hour, index) => {
    const hours = document.createElement("div");
    hours.classList.add("hours");
    const time = place.forecast.forecastday[0].hour[index].time;
    hours.innerText = time.split(" ")[1];
    hourlyWeather.appendChild(hours);

    const hourlyWeatherIcon = document.createElement("img");
    hourlyWeatherIcon.src =
      place.forecast.forecastday[0].hour[index].condition.icon;
    hours.appendChild(hourlyWeatherIcon);

    const hourlyTemp = document.createElement("div");
    hourlyTemp.innerText = `${place.forecast.forecastday[0].hour[index].temp_f} °F`;
    hours.appendChild(hourlyTemp);

    fahrenheit.addEventListener("click", () => {
      hourlyTemp.innerText = `${place.forecast.forecastday[0].hour[index].temp_f} °F`;
    });

    celsius.addEventListener("click", () => {
      hourlyTemp.innerText = `${place.forecast.forecastday[0].hour[index].temp_c} °C`;
    });
  });
};

const displayInfo = (place) => {
  switchMeasurements(place);
  displayArea(place);
  displayWeatherIcon(place);
  displayCurrentWeather(place);
  displayCurrentTemp(place);
  displayRainAndSnow(place);
  displayNextDays();
  displayNextWeathers(place);
  displayNextTemp(place);
  displayHourly(place);
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
