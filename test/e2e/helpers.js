require('dotenv').config();
require('../../lib/util/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

let tours = [
    {
        title: 'Benny\'s Big-Top',
        activities: [
            'Clown-Hunting',
            'Pie-Appraising',
            'Pig-Mimicking'
        ],
        launchDate: Date.now(),
        stops: []
    },
    {
        title: 'Al\'s Amazinarium',
        activities: [
            'Apple-Smithing',
            'Go-Kart-Boosting',
            'Knife-Whittling'
        ],
        launchDate: Date.now(),
        stops: []
    },
    {
        title: 'Kristof\'s House of Pain',
        activities: [
            'Electric Fence-testing',
            'Horse-Frightening',
            'Silo Base-Jumping'
        ],
        launchDate: Date.now(),
        stops: []
    }
];

const createTour = tour => {
    return request(app).post('/api/tours')
        .send(tour)
        .then(res => res.body);
};

const createTours = () => {
    return Promise.all(tours.map(createTour));
};

module.exports = {
    createTours
};
