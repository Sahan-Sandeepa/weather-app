const data = require('./city.json');
const API_KEY = 'ece374adf9391a60faad37cf41257d52';

const cityCodes = data.List.map(city => city.CityCode);

export function getUniqueCityCodes() {
    return Array.from(new Set(cityCodes));
}

// console.log(getUniqueCityCodes());

// export const getCityCodes = () => {

//     // const cityData = {
//     //     "List": [{ "CityCode": "1248991", "CityName": "Colombo", "Temp": "33.0", "Status": "Clouds" },
//     //     { "CityCode": "1850147", "CityName": "Tokyo", "Temp": "8.6", "Status": "Clear" },
//     //     { "CityCode": "2644210", "CityName": "Liverpool", "Temp": "16.5", "Status": "Rain" },
//     //     { "CityCode": "2988507", "CityName": "Paris", "Temp": "22.4", "Status": "Clear" },
//     //     { "CityCode": "2147714", "CityName": "Sydney", "Temp": "27.3", "Status": "Rain" },
//     //     { "CityCode": "4930956", "CityName": "Boston", "Temp": "4.2", "Status": "Mist" },
//     //     { "CityCode": "1796236", "CityName": "Shanghai", "Temp": "10.1", "Status": "Clouds" },
//     //     { "CityCode": "3143244", "CityName": "Oslo", "Temp": "-3.9", "Status": "Clear" }]
//     // };

//     // const cityCodes = cityData.List.map(city => city.CityCode);
//     // console.log(cityCodes)
//     // return cityCodes;
// };
// Example usage// ['1248991', '1850147', '2644210', '2988507', '2147714', '4930956', '1796236', '3143244']

// Function to get weather data for a city
export const getQueryWeatherData = async (cityCode) => {
    // Check if data is in cache and not expired
    const cachedData = getCachedData(cityCode);
    if (cachedData && !isCacheExpired(cachedData.timestamp)) {
        return Promise.resolve(cachedData.data);
    }

    // If data is not in cache or cache is expired, make a request to openweathermap.org
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}&units=metric`;
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Store the data in cache along with a timestamp
            const timestamp = new Date().getTime();
            cacheData(cityCode, data, timestamp);

            // Return the latest data
            return data;
        });
}

// Function to check if cached data is expired
function isCacheExpired(timestamp) {
    const now = new Date().getTime();
    return (now - timestamp) > (5 * 60 * 1000); // Cache expires after 5 minutes
}

// Function to get cached data
function getCachedData(cityCode) {
    const cachedData = localStorage.getItem(`weather_${cityCode}`);
    return cachedData ? JSON.parse(cachedData) : null;
}

// Function to store data in cache
function cacheData(cityCode, data, timestamp) {
    localStorage.setItem(`weather_${cityCode}`, JSON.stringify({ data, timestamp }));
}
