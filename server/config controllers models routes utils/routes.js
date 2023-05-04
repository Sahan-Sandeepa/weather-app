const router = require('express').Router();
const getWeatherData = require('./getWeatherData');

router.route('/cities').get((req, res) => {
    City.find()
        .then(cities => res.json(cities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/api/weather/:cityCode').get(async (req, res) => {
    try {
        const cityCode = req.params.cityCode;
        const weatherData = await getWeatherData(cityCode);
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
});

module.exports = router;
