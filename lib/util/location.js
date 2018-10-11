const getLocationWeather = require('../../weather-service-example');

module.exports = (req, res, next) => {
    const { zip } = req.body;

    req.weather = 'something';

    next();
};
