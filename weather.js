import axios from "axios";

// https://api.open-meteo.com/v1/forecast?current=temperature_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min
export function getWeather(lat,lon,timezone){
   return axios.get("https://api.open-meteo.com/v1/forecast?current=temperature_2m,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min" ,{
        params:{
            latitude:lat,
            longitude:lon,
            timezone,
        },
    }).then(({data})=>{
        return{
            current: parsecurrentweather(data),
            daily:parsedailyweather(data),
            hourly:parsehourlyweather(data),
        }
    })
}

function parsecurrentweather({current,daily}){
const{
    temperature_2m:currentTemp,
    wind_speed_10m:windSpeed,
    weather_code:iconcode,
    precipitation:precip}=current

const{
    temperature_2m_max:[maxTemp],
    temperature_2m_min:[minTemp],
    apparent_temperature_max:[maxfeelslike],
    apparent_temperature_min:[minfeelslike],
}=daily

    return {
        currentTemp,
        highTemp:maxTemp,
        lowTemp:minTemp,
        highfeelslike:maxfeelslike,
        lowfeelslike:minfeelslike,
        windSpeed,
        precip,
        iconcode,
    }
}

function parsedailyweather({daily}){
    return daily.time.map((time,index)=>{
        return{
            timestamp:time,
            iconcode:daily.weather_code[index],
            maxTemp:Math.round(daily.temperature_2m_max[index])
        }
    })
}

function parsehourlyweather({hourly,current}){
    return hourly.time.map((time,index)=>{
        return{
        timestamp:time,
        iconcode:hourly.weather_code[index],
        temp:Math.round(hourly.temperature_2m[index]),
        feelslike:Math.round(hourly.apparent_temperature[index]),
        windSpeed:Math.round(hourly.wind_speed_10m[index]),
        precip:Math.round(hourly.precipitation_probability[index]*100)/100,
        }
    }).filter(({timestamp})=>timestamp>=current.time)
}