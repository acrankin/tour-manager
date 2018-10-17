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
        Tour.find().then(tours => {
            res.json(tours);
        });
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;
        console.log(req.params);
        Tour.findById(id)
            .then(tour => res.json(tour));
    })

    .post('/:id/stops', (req, res) => {

    })
    
    .get('/:id/stops', (req, res) => {

    })
