const getLocationWeather = require('./weather-service');
const { HttpError } = require('./errors');

module.exports = (req, res, next) => {
    const { zip } = req.body;

    req.weather = 'something';
    
    if(!zip) {
        const error = new HttpError({ code: 404, message: 'missing ZIP' });
        next(error);
    }

    getLocationWeather(zip)
        .then(locationWeather => {
            req.weatherLocation = locationWeather;
            next();
        })
        .catch(next);
};
