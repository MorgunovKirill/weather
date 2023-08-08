import axios from "axios";

const API_KEY = process.env.VUE_APP_WEATHER_API_KEY;

export const getLocationByData = async (lat, lon) => {
    return axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
        .then((response) => {
            return response.data[0];
        });
}

export const getLocationByCityName = async (cityName, state = '', country = '') => {
    return axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state},${country}&limit=1&appid=${API_KEY}`)
        .then((response) => {
            return response.data[0];
        });
}

export const weatherInfoByLocationParams = (lat, lon) => {
    return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`)
        .then((response) => {
            return response;
        });
}