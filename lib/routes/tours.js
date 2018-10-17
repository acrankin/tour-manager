const router = require('express').Router();
const Tour = require('../models/Tour');

module.exports = router
    .post('/', (req, res) => {
        const { title, activities, launchDate, stops } = req.body;
        Tour.create({ title, activities, launchDate, stops })
            .then(tour => {
                res.json(tour);
            });
    })

    .get('/', (req, res) => {

    })

    .get('/:id', (req, res) => {

    })

    .post('/:id/stops', (req, res) => {

    })
    
    .get('/:id/stops', (req, res) => {

    })
