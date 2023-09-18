"use strict";

const form = document.querySelector(".find__form");
const input = document.querySelector(".find__form--input");
const findBtn = document.querySelector(".find__form--btn");
const locBtn = document.querySelector(".myLoc__btn");
const mainApp = document.querySelector(".app__main");

let lat, lon;

let online = true;

const isOnline = function () {
  if (!window.navigator.onLine) {
    mainApp.innerHTML = `
    <span class="app__main--span">${"Jesteś offline 😥"}</span>`;
    online = false;
  } else {
    online = true;
  }
};

const descrUpper = function (string) {
  return string[0].toUpperCase() + string.slice(1);
};

const handleError = function (msg) {
  mainApp.innerHTML = `
  <span class="app__main--span">${msg}</span>`;
};

const currentLocationWeather = function () {
  isOnline();
  if (!online) return;
  navigator.geolocation.getCurrentPosition((loc) => {
    console.log(loc);
    lat = loc.coords.latitude;
    lon = loc.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c819458245a8fe5fe149f4ee63f7baf&units=metric&lang=pl`
    )
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error(`Coś poszło nie tak...`);
        return res.json();
      })
      .then((data) => {
        console.log(lat, lon);
        console.log(data);

        const location = data.name;
        const { icon, description } = data.weather[0];
        const temp = Math.floor(data.main.temp);
        const hpa = Math.floor(data.main.pressure);

        const upperDesc = descrUpper(description);

        mainApp.innerHTML = `
          <p class="app__main--location">${location}</p>
          <img class="app__main--img"
          src=http://openweathermap.org/img/w/${icon}.png >
          <p class="app__main--temperature">${temp} &#8451;</p>
          <p class="app__main--pressure">${upperDesc}</p>
          <p class="app__main--pressure">Ciśnienie: ${hpa} &#13169;</p>`;
      })
      .catch((err) => {
        console.log(err);
        handleError(`${err.message}`);
      });
  }),
    { enableHighAccuracy: true };
};

locBtn.addEventListener("click", currentLocationWeather);

const searchLocationWeather = function (e) {
  e.preventDefault();
  isOnline();
  if (!online) return;

  const location = input.value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0c819458245a8fe5fe149f4ee63f7baf`
  )
    .then((res) => {
      console.log(res);
      if (!res.ok)
        throw Error(
          (mainApp.innerHTML = `
      <span class="app__main--span">Nie znalezionio miejscowości</span>`)
        );
      return res.json();
    })
    .then((data) => {
      lat = data.coord.lat;
      lon = data.coord.lon;

      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c819458245a8fe5fe149f4ee63f7baf&units=metric&lang=pl`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Coś poszło nie tak...");
          return res.json();
        })
        .then((data) => {
          console.log(lat, lon);
          console.log(data);

          const location = data.name;
          const { icon, description } = data.weather[0];
          const temp = Math.floor(data.main.temp);
          const hpa = Math.floor(data.main.pressure);

          const upperDesc = descrUpper(description);

          mainApp.innerHTML = `
          <p class="app__main--location">${location}</p>
          <img class="app__main--img"
          src=http://openweathermap.org/img/w/${icon}.png >
          <p class="app__main--temperature">${temp} &#8451;</p>
          <p class="app__main--pressure">${upperDesc}</p>
          <p class="app__main--pressure">Ciśnienie: ${hpa} &#13169;</p>`;
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
};

form.addEventListener("submit", searchLocationWeather);
