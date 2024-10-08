import {
    isOnline,
    online,
    handleError,
    wait,
    changeFirstLoad,
} from "../../index.js";
import { displayWeather } from "./DisplayWeather.js";

const input = document.querySelector(".find__form--input");
const mainApp = document.querySelector(".app__main");

let firstload = true;

export const searchLocationWeather = async function (e) {
    e.preventDefault();
    isOnline();
    if (!online) return;

    if (input.value == "Kasia Rogalska") {
        mainApp.innerHTML = `
    <span class="app__main--span starter__message">DLA CIEBIE ZAWSZE BĘDZIE ŚWIECIĆ SŁOŃCE </span><span class="secret">❣️</span>`;
        mainApp.style.minHeight = "35rem";
        return;
    }

    const location = input.value;
    try {
        const loc = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0c819458245a8fe5fe149f4ee63f7baf`
        );
        if (!loc.ok) throw new Error(`Nie znalezionio miejscowości`);
        // prettier-ignore
        const data1 = await loc.json()

        const lat = data1.coord.lat;
        const lon = data1.coord.lon;

        const pos = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c819458245a8fe5fe149f4ee63f7baf&units=metric&lang=pl`
        );
        if (!pos.ok) throw new Error(`Coś poszło nie tak...`);
        // prettier-ignore
        const data2 = await pos.json()
        if (firstload) await wait(1);
        displayWeather(data2);
        changeFirstLoad(false);
    } catch (err) {
        handleError(`${err.message}`);
    }
};
