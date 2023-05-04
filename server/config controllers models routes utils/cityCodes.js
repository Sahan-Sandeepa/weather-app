const fs = require('fs');
const citiesData = fs.readFileSync('./cities.json');
const cities = JSON.parse(citiesData);
const cityCodes = cities.List.map(city => city.CityCode);
console.log(cityCodes);

module.exports = cityCodes;