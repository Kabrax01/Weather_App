import { currentLocationWeather } from "./src/JS/CurrentLoc.js";
import { searchLocationWeather } from "./src/JS/SearchLocation.js";

("use strict");

const form = document.querySelector(".find__form");
const locBtn = document.querySelector(".myLoc__btn");
const mainApp = document.querySelector(".app__main");

export let online = true,
  firstLoad = true;

export const isOnline = function () {
  if (!window.navigator.onLine) {
    mainApp.innerHTML = `
    <span class="app__main--span">${"Jesteś offline 😥"}</span>`;
    online = false;
  } else {
    online = true;
  }
};

export const descrUpper = function (string) {
  return string[0].toUpperCase() + string.slice(1);
};

export const handleError = function (msg) {
  mainApp.innerHTML = `
  <span class="app__main--span">${msg}</span>`;
};

export const wait = async (sec) => {
  mainApp.innerHTML = "";
  mainApp.style.minHeight = "35rem";
  await new Promise((resolve) => setTimeout(resolve, 1000 * sec));
};

export const changeFirstLoad = (boolean) => {
  firstLoad = boolean;
};

locBtn.addEventListener("click", currentLocationWeather);
form.addEventListener("submit", searchLocationWeather);
