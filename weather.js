import axios from "axios";
//https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime

export function getWeather(lat,lon,timezone){
   return axios.get("https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,precipitation,weather_code&hourly=temperature_2m,apparent_temperature,precipitation,weather_code&daily=weather_code,temperature_2m_max&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime",{
        params:{
            latitude:lat,
            longitude:lon,
            timezone,
        },
    })
}