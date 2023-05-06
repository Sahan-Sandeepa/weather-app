// This function return the data of the delhi weather by default.

import axios from "axios";

const API_KEY = 'ece374adf9391a60faad37cf41257d52';

// export const getWeatherData = async () => {
//     const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=${key}&units=metric`);
//     const response = await data.json();
//     return response;
// }


// This function return the data of the country weather, asked by the user.
export const getQueryWeatherData = async (cityCode) => {

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}&units=metric`);
    return response.data;
}