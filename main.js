const fahrenheit = document.querySelector("#fahrenheit");
const celsius = document.querySelector("#celsius");
const searchBar = document.querySelector(".searchBar");
const submit = document.querySelector(".submit");
const area = document.querySelector(".area");
const weatherIcon = document.querySelector(".weatherIcon");
const currentWeather = document.querySelector(".currentWeather");
const currentTemp = document.querySelector(".currentTemp");
const precipitation = document.querySelector(".precipitation");

const fetchWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=f4c93d4e6e0043c29fe45029232209&q=${location}`,
    );
    const weatherData = await response.json();
    console.log(weatherData);
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
