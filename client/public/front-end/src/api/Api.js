const API_KEY = 'ece374adf9391a60faad37cf41257d52';

// export const getWeatherData = async () => {
//     const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=${key}&units=metric`);
//     const response = await data.json();
//     return response;
// }


// This function return the data of the country weather, asked by the user.
// export const getQueryWeatherData = async (cityCode) => {

//     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}&units=metric`);
//     return response.data;
// }

// Function to get weather data for a city
export const getQueryWeatherData = async (cityCode)  => {
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
