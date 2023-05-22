import { API_URL } from '../component/constants/components';
const data = require('../data/city.json');
//get api key from the env file
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
    const apiUrl = `${API_URL}?id=${cityCode}&appid=${API_KEY}&units=metric`;

    // Check if cache is being populated by another request
    if (isCachePopulating(cityCode)) {
        return new Promise((resolve, reject) => {
            const checkCacheInterval = setInterval(() => {
                const updatedData = getCachedData(cityCode);
                if (updatedData && !isCacheExpired(updatedData.timestamp)) {
                    clearInterval(checkCacheInterval);
                    resolve(updatedData.data);
                }
            }, 100);
        });
    }

    // Mark cache as populating before making the request
    startCachePopulation(cityCode);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Update the cached data with the actual data and the latest timestamp
        cacheData(cityCode, data, new Date().getTime());

        // Return the latest data
        return data;
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
        return null;
    } finally {
        // Mark cache population as complete
        completeCachePopulation(cityCode);
    }
}

// Function to check if cached data is expired
function isCacheExpired(timestamp) {
    const now = new Date().getTime();
    return (now - timestamp) > (5 * 60 * 1000); // Cache expires after 5 minutes
}

// Function to check if cache is being populated by another request
function isCachePopulating(cityCode) {
    return localStorage.getItem(`cache_population_${cityCode}`) === 'true';
}

// Function to mark cache as populating
function startCachePopulation(cityCode) {
    localStorage.setItem(`cache_population_${cityCode}`, 'true');
}

// Function to mark cache population as complete
function completeCachePopulation(cityCode) {
    localStorage.setItem(`cache_population_${cityCode}`, 'false');
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
