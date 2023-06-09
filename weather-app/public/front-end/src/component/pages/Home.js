import { useEffect, useState } from 'react';
import { getQueryWeatherData, getUniqueCityCodes } from '../../api-call/Api';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar'
import watherIcon from '../assets/wather-icon.png';
import Footer from '../common/Footer';
import '../assets/style.css'

const Home = () => {
    const [defaultCities, setDefaultCities] = useState([]);

    // Fetching weather data for default cities using Promise.all().
    useEffect(() => {
        const fetchData = async () => {
            const cityCodes = getUniqueCityCodes();
            const citiesWeatherData = await Promise.all(
                // wait for a Promise and get its fulfillment value
                cityCodes.map(cityCode => getQueryWeatherData(cityCode))
            );
            setDefaultCities(citiesWeatherData);
        };
        // Calling the fetchData()
        fetchData();
    }, []);

    const removeCityWeatherData = (name) => {
        // Filtering out the city weather data object from the `defaultCities` array whose name matches with the provided `name`.
        setDefaultCities(defaultCities.filter((city) => city.name !== name));
    };

    if (!defaultCities) {
        return <div>Loading...</div>;
    }
    return (
        <><div className="container">
            <div className="xcol">
                <img src={watherIcon} alt="Cloud Icon"/>
                <div className="icon-font">Weather App</div>
            </div>
            <SearchBar />

            <div className="mt-8 mx-auto my-4 md:my-8 w-4/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-10 card-description">
                {/* <!-- This is the data mapping starts--> */}
                {defaultCities.map((cityWeather, index) => (
                    <div
                        // nth-child selector to apply different background colors to each card based on its position in the parent container.
                        className={`weather-card ${index === 0}`}
                        key={cityWeather.id}
                    >
                        {/* <!-- This button element allows removing of city data --> */}
                        <button
                            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 text-gray-700"
                            onClick={() => removeCityWeatherData(cityWeather.name)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* <!-- This Link element directs to a page with more detailed city weather data --> */}
                        <Link to={`/${cityWeather.id}`}>

                            <div className="flex flex-col justify-between h-full card-bg">
                                <div className="flex flex-col text-center text-md font-bold text-gray-900 flexcol contryName-font">
                                    <span className="uppercase text-gray-700 home-font">
                                        {cityWeather.name}, {cityWeather.sys.country}
                                    </span>
                                    <span className="font-normal text-gray-700 text-sm">
                                        {new Date().toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        }).toLowerCase()}, {new Date().toLocaleString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>

                                <div className="flex justify-between h-36 middle-crd">
                                    <div className="flex items-center mt-2 white-text">
                                        <img
                                            src={`//openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
                                            alt="weather icon"
                                            className="w-16 h-16 mr-2" />
                                        <div>{cityWeather.weather[0].description}</div>
                                    </div>

                                    <div className="flex flex-col justify-center items-center text-gray-700 mr-25">


                                        {/* <!-- Current temperature --> */}
                                        <div className="text-4xl font-bold font-w temp-main">{cityWeather.main.temp.toFixed(1)}&deg;C</div>

                                        {/* <!-- Temperature range --> */}
                                        <div className="text-xs" id='temp'>
                                            <br />
                                            Temp Min: {cityWeather.main.temp_min.toFixed(1)}&deg;C <br />
                                            Temp Max: {cityWeather.main.temp_max.toFixed(1)}&deg;C
                                        </div>
                                    </div>
                                </div>

                                {/* This div contains weather information about the city, including pressure, humidity, and visibility. */}

                                <div className='bottom bottom-768'>
                                    <div className="flex justify-between h-20 items-center mt-5">
                                        <div className="text-gray-700 text-xs flex flex-col bottom-left bottom-left-768">
                                            <div className="mb-1 font-style-768"><div className='font-style'>Pressure: </div>{cityWeather.main.pressure} hPa</div>
                                            <div className="mb-1 font-style-768"><div className='font-style'>Humidity: </div>{cityWeather.main.humidity}%</div>
                                            <div className='font-style-768'><div className='font-style'>Visibility: </div>{cityWeather.visibility / 1000} km</div>
                                        </div>
                                        <div className="border-l-2 h-12 border-l-2-main"></div>
                                        <div className="flex items-center">
                                            <div className="text-lg font-bold mr-2 font">
                                                <div className='bottom-middle'>
                                                    <svg className="h-6 w-6 text-white bottom-middle-cenetr" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    </svg>
                                                </div>
                                                {cityWeather.wind.speed.toFixed(1)} m/s 120 Degree
                                            </div>
                                        </div>

                                        {/* It also includes information about wind speed and direction, as well as the sunrise and sunset times for the city. */}
                                        <div className="border-l-2 border-l-2-main border-white h-12"></div>
                                        <div className="text-gray-700 text-xs flex flex-col bottom-right-home bottom-right-home-768">
                                            <div className="mb-1"><div className='font-style'>Sunrise: </div>{new Date(cityWeather.sys.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }).toLowerCase()}</div>
                                            <div ><div className='font-style'>Sunset: </div>{new Date(cityWeather.sys.sunset * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }).toLowerCase()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

                {/* mapping end here */}

            </div>
        </div>
            <Footer />
        </>
    );
};
export default Home;






