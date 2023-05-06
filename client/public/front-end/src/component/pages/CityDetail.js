import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQueryWeatherData } from '../utils/Api';
import '../assets/style.css';

const CityDetail = () => {

    // This code uses React hooks to fetch weather data for a city based on the city ID obtained from the URL parameter.
    const { cityId } = useParams();
    const [cityWeather, setCityWeather] = useState(null);

    // It renders a loading message until the data is fetched and stored in state.
    useEffect(() => {
        const fetchData = async () => {
            const cityWeatherData = await getQueryWeatherData(cityId);
            setCityWeather(cityWeatherData);
        };
        fetchData();
    }, [cityId]);

    if (!cityWeather) {
        return <div>Loading...</div>;
    }

    const countryCodes = {
        "Sri Lanka": "SL",
        "Japan": "JP",
        "Great Britain": "GB",
        "Australia": "AU",
        "United State": "US"
    };

    const city = cityWeather.name;
    const country = cityWeather.sys.country;
    const countryCode = countryCodes[country] || country;
    return (
        <div className="transition duration-500 ease-in-out transform cursor-default flex flex-col text-center p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3">

            <div className="transition duration-500 ease-in-out transform rounded-lg cursor-default" style={{
                backgroundColor: "hsl(228deg 11.81% 24.9%)"
            }}>
                <div style={{ backgroundColor: "hsl(210.51deg 78.48% 56.27%)", paddingTop: "10px" }}>
                    <div className="flex justify-between items-center mb-4" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: "hsl(210.51deg 78.48% 56.27%)" }}>
                        <div className="text-gray-900 font-bold text-md " style={{
                            marginBottom: "1%", color: "white",
                            fontSize: "24px"
                        }}>
                            {/* A button that takes the user back to the home page. */}
                            <div className="absolute top-4 left-4 cursor-pointer">
                                <Link to={"/"} key={city}>
                                    <button className="absolute top-0 left-0 p-2" >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>

                            {/* Displays the name of the city and the country code. */}
                            {city}, {countryCode}
                        </div>

                        {/* Displays the current time, and the current month and day. */}
                        {/* This div contains the time and date. */}
                        <div className="text-gray-700 text-sm font-normal" style={{
                            backgroundColor: "hsl(210.51deg 78.48% 56.27%)", color: "white"
                        }}>

                            {new Date().toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}, {new Date().toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between h-36">
                        <div className="flex flex-col justify-center items-center text-gray-700" style={{ marginLeft: "25%" }}>

                            {/* Weather icon */}
                            <div className="flex justify-center mt-2" >
                                <img
                                    src={`//openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
                                    alt="weather icon"
                                    className="w-16 h-16"
                                />
                            </div>

                            {/* Weather description */}
                            <div className="text-center mt-2" style={{
                                color: "white",
                                fontSize: "24px"
                            }}>{cityWeather.weather[0].description}</div>
                        </div>

                        {/* Middle vertical divider */}
                        <div className="border-l-2 border-white h-14" style={{ marginTop: '5%' }}></div>

                        {/* Right side section */}
                        <div className="flex flex-col justify-center items-center text-gray-700" style={{
                            marginRight: "25%", color: "white",
                            fontSize: "24px"
                        }}>

                            {/* Current temperature */}
                            <div className="text-4xl font-bold">{cityWeather.main.temp.toFixed(1)}&deg;C</div>

                            {/* Temperature range */}
                            <div className="text-xs">
                                Temp Min: {cityWeather.main.temp_min.toFixed(1)}&deg;C <br />
                                Temp Max: {cityWeather.main.temp_max.toFixed(1)}&deg;C
                            </div>
                        </div>
                    </div>
                </div>

                {/* // Displays pressure, humidity and visibility for a city */}

                <div style={{ backgroundColor: "hsl(228deg 11.81% 24.9%)", borderBottomLeftRadius: "3px", borderBottomRightRadius: "3px", marginBottom: "13px" }}>
                    <div className="flex justify-between h-20 items-center mt-4">
                        <div className="text-gray-700 text-xs flex flex-col" style={{
                            color: "white",
                            marginLeft: "15%"
                        }}>

                            {/* // Displays pressure, humidity and visibility for a city */}
                            <div className="mb-1">Pressure: {cityWeather.main.pressure} hPa</div>
                            <div className="mb-1">Humidity: {cityWeather.main.humidity}%</div>
                            <div>Visibility: {cityWeather.visibility / 1000} km</div>
                        </div>
                        <div className="border-l-2 border-white h-8"></div>
                        <div className="flex items-center">
                            <div className="text-lg font-bold mr-2" style={{
                                color: "white"
                            }}>

                                {/* // Uses flexbox to position elements, and SVG for wind icon */}
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: "5%" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: "rotate(45deg)", display: "flex", justifyContent: "center" }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                    </svg>
                                </div>
                                {cityWeather.wind.speed.toFixed(1)} m/s 120 Degree
                            </div>
                        </div>
                        <div className="border-l-2 border-white h-8"></div>
                        <div className="text-gray-700 text-xs flex flex-col" style={{
                            color: "white",
                            marginRight: "15%",
                        }}>

                            {/* displays wind speed and direction, and sunrise/sunset times */}
                            <div className="mb-1">Sunrise: {new Date(cityWeather.sys.sunrise * 1000).toLocaleTimeString()}</div>
                            <div>Sunset: {new Date(cityWeather.sys.sunset * 1000).toLocaleTimeString()}</div>
                        </div>
                        <div style={{
                            backgroundColor: "hsl(228deg 11.81% 24.9%)",
                            marginTop: "3px"
                        }}></div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CityDetail;
