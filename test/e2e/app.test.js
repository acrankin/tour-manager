require('dotenv').config();
require('../../lib/util/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');

describe('tour routes', () => {
    
    beforeEach(() => {
        return dropCollection('tours');
    });

    it('creates a tour on POST', () => {
        return request(app).post('/api/tours')
            .send({
                title: 'Benny\'s Big-Top',
                activities: [
                    'Clown-Hunting',
                    'Pie-Appraising',
                    'Pig-Mimicking'
                ],
                launchDate: Date.now(),
                stops: []
            })
            .then(createdTour => {
                expect(createdTour.body).toEqual({
                    _id: expect.any(String),
                    __v: expect.any(Number),
                    title: 'Benny\'s Big-Top',
                    activities: [
                        'Clown-Hunting',
                        'Pie-Appraising',
                        'Pig-Mimicking'
                    ],
                    launchDate: expect.any(String),
                    stops: []
                });
            });
    });
});
