import {
    isOnline,
    online,
    handleError,
    wait,
    firstLoad,
    changeFirstLoad,
} from "../../index.js";
import { displayWeather } from "./DisplayWeather.js";

const input = document.querySelector(".find__form--input");
const mainApp = document.querySelector(".app__main");

const getPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

export const currentLocationWeather = async function () {
    isOnline();
    if (!online) return;
    input.value = "";

    try {
        if (!navigator.geolocation)
            throw new Error("Nie można pobrać lokalizacji");
        const loc = await getPosition();

        const lat = loc.coords.latitude;
        const lon = loc.coords.longitude;

        const pos = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c819458245a8fe5fe149f4ee63f7baf&units=metric&lang=pl`
        );
        if (!pos.ok) throw new Error(`Coś poszło nie tak...`);
        // prettier-ignore
        const data = await pos.json();

        if (firstLoad) await wait(1);
        displayWeather(data);
        changeFirstLoad(false);
    } catch (err) {
        console.error(err);
        handleError(`${err.message}`);
    }
};
