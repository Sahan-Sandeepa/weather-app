import { useEffect, useState } from 'react';
import { getQueryWeatherData } from '../utils/allApi';
import { Link } from 'react-router-dom';


const Home = () => {
    const [defaultCities, setDefaultCities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const citiesWeatherData = await Promise.all([

                getQueryWeatherData('1850147'),
                getQueryWeatherData('2644210'),
                getQueryWeatherData('2988507'),
                getQueryWeatherData('2147714'),
                getQueryWeatherData('4930956'),
                getQueryWeatherData('1796236'),
                getQueryWeatherData('3143244'),
            ]);
            setDefaultCities(citiesWeatherData);
        };
        fetchData();
    }, []);

    const removeCityWeatherData = (name) => {
        setDefaultCities(defaultCities.filter((city) => city.name !== name));
    };
    const countryCodes = {
        "Sri Lanka": "SL",
        "Japan": "JP",
        "Great Britain": "GB",
        "Australia": "AU",
        "United State": "US"
    };

    return (
        <>
            <div className="mt-8 mx-auto my-4 md:my-8 w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-10" >
                {defaultCities.map((cityWeather) => (
                    <div
                        className="transition duration-500 ease-in-out transform bg-sky-200 rounded-lg hover:scale-105 cursor-pointer border flex flex-col text-center p-6 relative"
                        key={cityWeather.id}
                        style={{ padding: "10px 0px 0px 0px" }}
                    >

                        <button
                            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <Link to={`/${cityWeather.id}`}>

                        <div className="flex flex-col justify-between h-full">
                                <div className="flex flex-col text-center text-md font-bold text-gray-900" style={{ marginTop: "20px", marginRight: "42%" }}>
                                    <span className="uppercase">
                                        {cityWeather.name}
                                    </span>
                                    <span className="font-normal text-gray-700 text-sm">
                                        {new Date().toLocaleString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                
                                <div className="flex justify-between h-36">
                                    <div className="flex flex-col justify-center items-center text-gray-700" style={{ marginLeft: "15%" }}>
                                        <div className="flex justify-center mt-2" >
                                            <img
                                                src={`//openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
                                                alt="weather icon"
                                                className="w-16 h-16"
                                            />
                                        </div>
                                        <div className="text-center mt-2" style={{
                                            color: "white",
                                            fontSize: "20px"
                                        }}>{cityWeather.weather[0].description}</div>
                                    </div>
                                    
                                    <div className="flex flex-col justify-center items-center text-gray-700" style={{
                                        marginRight: "15%", color: "white", marginBottom: "10%"
                                    }}>
                                        <div className="text-4xl font-bold" style={{fontSize: "44px"
                                        }}>{cityWeather.main.temp.toFixed(1)}&deg;C</div>
                                        <div className="text-xs" style={{ marginTop: "65%"
                                        }}>
                                            Temp Min: {cityWeather.main.temp_min.toFixed(1)}&deg;C <br />
                                            Temp Max: {cityWeather.main.temp_max.toFixed(1)}&deg;C
                                        </div>
                                    </div>
                                </div>

                                <div style={{ backgroundColor: "hsl(228deg 11.81% 24.9%)", borderBottomLeftRadius: "3px", borderBottomRightRadius: "3px", marginBottom: "13px"}}>
                                    <div className="flex justify-between h-20 items-center mt-5">
                                        <div className="text-gray-700 text-xs flex flex-col" style={{
                                            color: "white",
                                            marginLeft: "5%"
                                        }}>
                                            <div className="mb-1">Pressure: {cityWeather.main.pressure} hPa</div>
                                            <div className="mb-1">Humidity: {cityWeather.main.humidity}%</div>
                                            <div>Visibility: {cityWeather.visibility / 1000} km</div>
                                        </div>
                                        <div className="border-l-2 border-white h-8"></div>
                                        <div className="flex items-center">
                                            <div className="text-lg font-bold mr-2" style={{
                                                color: "white"
                                            }}>
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
                                            marginRight: "5%",
                                        }}>
                                            <div className="mb-1">Sunrise: {new Date(cityWeather.sys.sunrise * 1000).toLocaleTimeString()}</div>
                                            <div>Sunset: {new Date(cityWeather.sys.sunset * 1000).toLocaleTimeString()}</div>
                                        </div>
                                        <div style={{
                                            backgroundColor: "hsl(228deg 11.81% 24.9%)"
                                        }}></div>
                                    </div>
                                </div>
                            </div></Link>
                        </div>
                ))}
            </div>
        </>
    );
};
export default Home;






