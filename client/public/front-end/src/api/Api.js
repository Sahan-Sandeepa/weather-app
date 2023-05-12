const data = require('./city.json');
const API_KEY = process.env.REACT_APP_API_KEY;

const cityCodes = data.List.map(city => city.CityCode);

export function getUniqueCityCodes() {
    return Array.from(new Set(cityCodes));
}

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
