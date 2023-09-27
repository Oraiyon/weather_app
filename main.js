const tempButtons = document.querySelector(".tempButtons");
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
const hourlyWeatherAM = document.querySelector(".hourlyWeatherAM");
const hourlyWeatherPM = document.querySelector(".hourlyWeatherPM");

const switchMeasurements = (place, element, index) => {
  fahrenheit.addEventListener("click", () => {
    currentTemp.innerText = `${place.current.temp_f} °F`;
    futureTemp.forEach((temp, index) => {
      temp.innerText = `${
        place.forecast.forecastday[index + 1].day.avgtemp_f
      } °F`;
    });
    element.innerText = `${place.forecast.forecastday[0].hour[index].temp_f} °F`;
  });

  celsius.addEventListener("click", () => {
    currentTemp.innerText = `${place.current.temp_c} °C`;
    futureTemp.forEach((temp, index) => {
      temp.innerText = `${
        place.forecast.forecastday[index + 1].day.avgtemp_c
      } °C`;
    });
    element.innerText = `${place.forecast.forecastday[0].hour[index].temp_c} °C`;
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
  switchMeasurements(place);
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
  switchMeasurements(place);
};

const setDayOrNight = (array, index, element) => {
  if (array[index].is_day === 0) {
    element.classList.add("night");
  } else {
    element.classList.add("day");
  }
};

const displayHourly = (place) => {
  let hourIndex = 0;

  const hoursArray = place.forecast.forecastday[0].hour;
  hoursArray.forEach((hour, index) => {
    if (hourIndex < 12) {
      const hours = document.createElement("div");
      hours.classList.add("hours");
      const time = place.forecast.forecastday[0].hour[index].time;
      hours.innerText = time.split(" ")[1];
      hourlyWeatherAM.appendChild(hours);
      setDayOrNight(hoursArray, index, hours);

      const hourlyWeatherIcon = document.createElement("img");
      hourlyWeatherIcon.src =
        place.forecast.forecastday[0].hour[index].condition.icon;
      hours.appendChild(hourlyWeatherIcon);

      const hourlyTemp = document.createElement("div");
      hourlyTemp.innerText = `${place.forecast.forecastday[0].hour[index].temp_f} °F`;
      hours.appendChild(hourlyTemp);

      switchMeasurements(place, hourlyTemp, index);

      return hourIndex++;
    } else {
      const hours = document.createElement("div");
      hours.classList.add("hours");
      const time = place.forecast.forecastday[0].hour[index].time;
      hours.innerText = time.split(" ")[1];
      hourlyWeatherPM.appendChild(hours);
      setDayOrNight(hoursArray, index, hours);

      const hourlyWeatherIcon = document.createElement("img");
      hourlyWeatherIcon.src =
        place.forecast.forecastday[0].hour[index].condition.icon;
      hours.appendChild(hourlyWeatherIcon);

      const hourlyTemp = document.createElement("div");
      hourlyTemp.innerText = `${place.forecast.forecastday[0].hour[index].temp_f} °F`;
      hours.appendChild(hourlyTemp);

      switchMeasurements(place, hourlyTemp, index);
    }
  });
};

const displayInfo = (place) => {
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
    displayInfo(weatherData);
  } catch (error) {
    console.log("ERROR", error);
  }
};

const revealTempButtons = (element) => {
  element.setAttribute("style", "display:flex;");
};

submit.addEventListener("click", () => {
  if (searchBar.value === "") {
    console.log("Enter Location");
  } else {
    fetchWeather(searchBar.value).then((fulfilled) => {
      revealTempButtons(tempButtons);
    });
    searchBar.value = "";
  }
});
