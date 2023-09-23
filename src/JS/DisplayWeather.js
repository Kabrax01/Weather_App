import { descrUpper } from "../../index.js";
import { displayForecast } from "./Forecast.js";

("use strict");

export const displayWeather = function (data) {
  const mainApp = document.querySelector(".app__main");

  const location = data.name;
  const { icon, description: desc } = data.weather[0];
  const temp = Math.floor(data.main.temp);
  const hpa = Math.floor(data.main.pressure);

  const description = descrUpper(desc);

  mainApp.innerHTML = `
      <p class="app__main--location">${location}</p>
      <img class="app__main--img"
      src=https://openweathermap.org/img/w/${icon}.png >
      <p class="app__main--temperature">${temp} &#8451;</p>
      <p class="app__main--description">${description}</p>
      <p class="app__main--pressure">Ciśnienie: ${hpa} &#13169;</p>
      <div class="app_main__forecast"></div>`;

  const { lon, lat } = data.coord;

  displayForecast(lat, lon);
};
