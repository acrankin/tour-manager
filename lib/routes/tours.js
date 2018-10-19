const router = require('express').Router();
const Tour = require('../models/Tour');
const location = require('../util/location');


module.exports = router
    .post('/', (req, res) => {
        const { title, activities, launchDate, stops } = req.body;
        Tour.create({ title, activities, launchDate, stops })
            .then(tour => {
                res.json(tour);
            });
    })

    .get('/', (req, res) => {
        Tour.find().then(tours => {
            res.json(tours);
        });
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        Tour.findById(id)
            .then(tour => res.json(tour));
    })

    .post('/:id/stops', location, (req, res, next) => {
        const { id } = req.params;
        const { stop } = req;
        Tour.findByIdAndUpdate(id, { $push: { stops: stop } }, { new: true, runValidators: true })
            .then(tour => {
                res.json(tour);
            });
    })
    
    .get('/:id/stops', (req, res) => {

    })
