const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = 'ece374adf9391a60faad37cf41257d52';

async function getWeatherData(cityCode) {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}&units=metric`);
    return response.data;
}

app.get('/api/weather/:cityCode', async (req, res) => {
    try {
        const cityCode = req.params.cityCode;
        const weatherData = await getWeatherData(cityCode);
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
});
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;