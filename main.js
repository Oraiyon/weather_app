const tempButtons = document.querySelector(".tempButtons");
const fahrenheit = document.querySelector("#fahrenheit");
const celsius = document.querySelector("#celsius");
const searchBar = document.querySelector(".searchBar");
const submit = document.querySelector(".submit");
const area = document.querySelector(".area");
const currentTitle = document.querySelector(".currentTitle");
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
const iconButtons = document.querySelectorAll(".iconButton");
const hourlyTitle = document.querySelector(".hourlyTitle");

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
  currentTitle.innerText = "Current Weather:";
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

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const displayNextDays = () => {
  const today = new Date().getDay();
  futureDay.forEach((day, index) => {
    let dayOfWeek = days[today + index + 1];
    if (dayOfWeek === undefined && index === 1) {
      dayOfWeek = days[0];
      day.innerText = dayOfWeek;
    } else if (dayOfWeek === undefined && index === 2) {
      dayOfWeek = days[1];
      day.innerText = dayOfWeek;
    } else {
      day.innerText = dayOfWeek;
    }
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

const clearHourlys = (element1, element2) => {
  while (element1.firstChild) {
    element1.removeChild(element1.firstChild);
  }
  while (element2.firstChild) {
    element2.removeChild(element2.firstChild);
  }
};

let day = 0;

const displayHourly = (place) => {
  let hourIndex = 0;

  clearHourlys(hourlyWeatherAM, hourlyWeatherPM);

  const today = new Date().getDay();

  if (day === 0) {
    hourlyTitle.innerText = "Today's Hourly Forecast:";
  } else {
    hourlyTitle.innerText = `${days[today + day]}'s Hourly Forecast:`;
  }

  const hoursArray = place.forecast.forecastday[day].hour;
  hoursArray.forEach((hour, index) => {
    const hours = document.createElement("div");
    hours.classList.add("hours");
    const time = place.forecast.forecastday[day].hour[index].time;
    hours.innerText = time.split(" ")[1];

    setDayOrNight(hoursArray, index, hours);

    const hourlyWeatherIcon = document.createElement("img");
    hourlyWeatherIcon.src =
      place.forecast.forecastday[day].hour[index].condition.icon;
    hours.appendChild(hourlyWeatherIcon);

    const hourlyTemp = document.createElement("div");
    hourlyTemp.innerText = `${place.forecast.forecastday[day].hour[index].temp_f} °F`;
    hours.appendChild(hourlyTemp);

    switchMeasurements(place, hourlyTemp, index);

    if (hourIndex < 12) {
      hourlyWeatherAM.appendChild(hours);
      return hourIndex++;
    } else {
      hourlyWeatherPM.appendChild(hours);
    }
  });
};

const displayOtherHourlys = (place) => {
  iconButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      day = index;
      displayHourly(place);
    });
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
  displayOtherHourlys(place);
};

const fetchWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=f4c93d4e6e0043c29fe45029232209&days=4&q=${location}`,
    );
    const weatherData = await response.json();
    displayInfo(weatherData);
  } catch (error) {
    alert("INVALID LOCATION");
  }
};

const revealTempButtons = (element) => {
  element.setAttribute("style", "display:flex;");
};

const selectedTempButtons = () => {
  fahrenheit.classList.add("selectedTemp");
  fahrenheit.addEventListener("click", () => {
    fahrenheit.classList.add("selectedTemp");
    celsius.classList.remove("selectedTemp");
  });
  celsius.addEventListener("click", () => {
    fahrenheit.classList.remove("selectedTemp");
    celsius.classList.add("selectedTemp");
  });
};

submit.addEventListener("click", () => {
  if (searchBar.value === "") {
    alert("Enter Location");
  } else {
    fetchWeather(searchBar.value).then((fulfilled) => {
      revealTempButtons(tempButtons);
      selectedTempButtons();
    });
    searchBar.value = "";
  }
});
