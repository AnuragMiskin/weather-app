import "./style.css";
import { getWeather } from "./weather";

getWeather(10,10,Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderweather)
.catch(e=>{
    console.error(e),
    alert("Error getting weather")
})

function renderweather({current,daily,hourly}){
    // renderCurrentWeather(current)
    // renderDailyWeather(daily)
    // renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}
