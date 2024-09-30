import { descrUpper } from "../../index.js";

function getDayName(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pl-PL", { weekday: "short" });
}

export const displayForecast = async function (lat, lon) {
    const forecastContainer = document.querySelector(".app_main__forecast");

    const pos = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=0c819458245a8fe5fe149f4ee63f7baf&units=metric&lang=pl`
    );
    const data = await pos.json();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const date = `${yyyy}-${mm}-${dd}`;

    let daily = [];

    data.list.filter((pos) => {
        const hour = pos.dt_txt.split(" ")[1];
        const dataDate = pos.dt_txt.split(" ")[0];
        if (hour == "15:00:00" && dataDate !== date) {
            daily.push(pos);
        }
    }, date);

    daily.forEach((day) => {
        const dayString = day.dt_txt.split(" ")[0];
        const dayName = descrUpper(getDayName(dayString).slice(0, -1));
        const temp = Math.floor(day.main.temp);
        const { icon, description: desc } = day.weather[0];
        const html = `
    <div>
        <p class="app__main__forecast--day">${dayName}</p>
        <p class="app__main__forecast--temperature">${temp} &#8451;</p>
        <img class="app__main__forecast--img"
        src=https://openweathermap.org/img/w/${icon}.png >
        <p class="app__main--description">${desc}</p>
     </div>`;

        forecastContainer.insertAdjacentHTML("beforeend", html);
    });
};
