import "./style.css";
import { getWeather } from "./weather";
import { ICON_MAP } from "./iconMap";

getWeather(10,10,Intl.DateTimeFormat().resolvedOptions().timeZone).then(renderweather)
.catch(e=>{
    console.error(e),
    alert("Error getting weather")
})

function renderweather({current,daily,hourly}){
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    // renderHourlyWeather(hourly)
    document.body.classList.remove("blurred")
}
function setvalue(selector, value, { parent = document } = {}) {
    // Construct the attribute selector using a different attribute or method
    const attributeSelector = `[data-${selector}]`;
    // Find the element using the constructed selector
    const element = parent.querySelector(attributeSelector);
    // Check if the element exists before setting its textContent
    if (element) {
        element.textContent = value;
    } else {
        console.error(`Element with selector ${attributeSelector} not found`);
    }
}

function getIconUrl(iconcode){
    return `/${ICON_MAP.get(iconcode)}.svg`
}

const currenticon=document.querySelector("[data-current-icon]")
function renderCurrentWeather(current){
    currenticon.src=getIconUrl(current.iconcode)
    setvalue("current-temp",current.currentTemp)
    setvalue("current-high",current.highTemp)
    setvalue("current-low",current.lowTemp)
    setvalue("current-fl-low",current.lowfeelslike)
    setvalue("current-fl-high",current.highfeelslike)
    setvalue("current-wind",current.windSpeed)
    setvalue("current-precip",current.precip)
}

const Day_formatter = new Intl.DateTimeFormat("en-US", {weekday:"long"});
const dailysection=document.querySelector("[data-day-section]")
const daycardtemplate=document.getElementById("day-card-template")
function renderDailyWeather(daily){
    dailysection.innerHTML="";
    daily.forEach(day => {
        const element = daycardtemplate.content.cloneNode(true);
        const date = new Date(`${day.timestamp}T00:00:00`);
        const dayOfWeek = Day_formatter.format(date);
        setvalue("temp", day.maxTemp, { parent: element });
        setvalue("date", dayOfWeek, { parent: element });
        element.querySelector("[data-icon]").src = getIconUrl(day.iconcode);
        dailysection.append(element);
    });
}



