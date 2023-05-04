const fs = require('fs');
const citiesData = fs.readFileSync('./cities.json');
const cities = JSON.parse(citiesData);
const cityCodes = cities.List.map(city => city.CityCode);
console.log(cityCodes); // Output: ["1248991", "1850147", "2644210", "2988507", "2147714", "4930956", "1796236", "3143244"]
