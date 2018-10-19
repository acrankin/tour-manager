const getLocationWeather = require('./weather-service');
const { HttpError } = require('./errors');

module.exports = (req, res, next) => {
    const { zip } = req.body;

    if(!zip) {
        const error = new HttpError({ code: 404, message: 'missing ZIP' });
        next(error);
    }

    getLocationWeather(zip)
        .then(locationWeather => {
            req.stop = locationWeather;
            next();
        })
        .catch(next);
};
