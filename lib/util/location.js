const getLocationWeather = require('./weather-service');

module.exports = (req, res, next) => {
    const { zip } = req.body;

    req.weather = 'something';
    
    getLocationWeather(zip)
        .then(locationWeather => {
            req.weather = locationWeather;
            next();
        });
};
