import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQueryWeatherData } from '../../api-call/Api';
import '../assets/style.css';
import cloudIcon from '../assets/wather-icon.png';
import Footer from '../common/Footer';

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

    return (
        <div className='footer-component'>
            <div className="transition duration-500 ease-in-out transform cursor-default flex flex-col text-center p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 card-inside">
                <div className="xcol header">
                    <img src={cloudIcon} alt="Cloud Icon" />
                    <div className="icon-font">Weather App</div>
                </div>

                <div className="transition duration-500 ease-in-out transform rounded-lg cursor-default bg-color hover:scale-105 cursor-pointer bottom-crd">

                    <div className='third-contrainer'>
                        <div className="flex justify-between items-center mb-4 forth-contrainer">
                            <div className="text-gray-900 font-bold text-md fifth-contrainer contryName-font">
                                {/* A button that takes the user back to the home page. */}
                                <div className="absolute top-4 left-4 cursor-pointer">
                                    <Link to={"/"} key={cityWeather.name}>
                                        <button className="absolute top-0 left-0 p-2" >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white hover:text-gray-900" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>

                                {/* Displays the name of the city and the country code. */}
                                {cityWeather.name}, {cityWeather.sys.country}
                            </div>

                            {/* Displays the current time, and the current month and day. */}
                            {/* This div contains the time and date. */}
                            <div className="text-gray-700 text-sm font-normal date-time font-normal">

                                {new Date().toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                }).toLowerCase()}, {new Date().toLocaleString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </div>
                        </div>

                        <div className="card-flex justify-between h-48 middle-card">
                            <div className="flex flex-col justify-center items-center text-gray-700 icon-description icon-description-card">

                                {/* Weather icon */}
                                <div className="flex justify-center" >
                                    <img
                                        src={`//openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
                                        alt="weather icon"
                                        className="w-16 h-16"
                                    />
                                </div>

                                {/* Weather description */}
                                <div className="text-center description describe-weather">{cityWeather.weather[0].description}</div>
                            </div>

                            {/* Middle vertical divider */}
                            <div className="border border-white h-16 line-divider subcrd-line-devider"></div>

                            {/* Right side section */}
                            <div className="flex flex-col justify-center items-center text-gray-700 Right-side-section-card Right-side-section">

                                {/* Current temperature */}
                                <div className="text-4xl font-bold font-w">{cityWeather.main.temp.toFixed(1)}&deg;C</div>

                                {/* Temperature range */}
                                <div className="text-xs" id='temp'>
                                    Temp Min: {cityWeather.main.temp_min.toFixed(1)}&deg;c
                                    <br/>
                                    Temp Max: {cityWeather.main.temp_max.toFixed(1)}&deg;c
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* // Displays pressure, humidity and visibility for a city */}

                    <div className='bottom-left-city bottom-left'>
                        <div className="flex justify-between h-20 items-center mt-4 bottom-left-city-sub">
                            <div className="text-gray-700 text-xs flex flex-col bottom-left-sub-card bottom-left-sub">

                                {/* // Displays pressure, humidity and visibility for a city */}
                                <div className="mb-1"><div className='font-style'>Pressure: </div>{cityWeather.main.pressure} hPa</div>
                                <div className="mb-1"><div className='font-style'>Humidity: </div>{cityWeather.main.humidity}%</div>
                                <div ><div className='font-style'>Visibility: </div>{cityWeather.visibility / 1000} km</div>
                            </div>
                            <div className="border-l-2 border-white h-16"></div>
                            <div className="flex items-center">
                                <div className="text-lg font-bold mr-2 mr-2-2 text-gray-700">

                                    {/* // Uses flexbox to position elements, and SVG for wind icon */}
                                    <div className='bottom-middle-card bottom-middle'>
                                        <svg className="h-6 w-6 text-white bottom-middle-cenetr" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        </svg>
                                    </div>
                                    <div> <div className='bottom-middle-content font'>{cityWeather.wind.speed.toFixed(1)} m/s</div> 120 Degree </div>
                                </div>
                            </div>
                            <div className="border-l-2 border-white h-16"></div>
                            <div className="my-element text-gray-700 text-xs flex fl-col">

                                {/* displays wind speed and direction, and sunrise/sunset times */}
                                <div className="mb-1 bottom-right-card-sunrise"><div className='font-style'>Sunrise: </div>{new Date(cityWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase()}</div>
                                <div className="bottom-right bottom-right-card"><div className='font-style'>Sunset: </div>{new Date(cityWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }).toLowerCase()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CityDetail;
