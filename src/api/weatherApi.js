import axios from "axios";

const API_KEY = 'b1dfa8e82bb034221596bf3cec9b453e';

export const getCurrentLocation = async (lat, lon) => {
    return axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
}

export const weatherInfoByLocationParams = (lat, lon) => {
    return axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${API_KEY}`)
        .then((response) => {
           return response;
        });
}