require('dotenv').config();
require('../../lib/util/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const Tour = require('../../lib/models/Tour');
const { dropCollection } = require('./db');
const { createTours } = require('./helpers');

describe('tour routes', () => {
    let createdTours;
    
    beforeEach(() => {
        return dropCollection('tours');
    });

    beforeEach(() => {
        return createTours()
            .then(toursRes => {
                createdTours = toursRes;
            });
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

    it('gets all tours', () => {
        return request(app).get('/api/tours')
            .then(retrievedTours => {
                createdTours.forEach(createdTour => {
                    expect(retrievedTours.body).toContainEqual(createdTour);
                });
                expect(retrievedTours.body).toHaveLength(createdTours.length);
            });
    });

    it('gets a tour by id', () => {
        const id = createdTours[0]._id;
        return request(app).get(`/api/tours/${id}`)
            .then(retrievedTour => {
                expect(retrievedTour.body)
                    .toEqual({ ...createdTours[0], __v: expect.any(Number) });
            });
    });

    describe('stops', () => {
        it('pushes a stop to a tour', () => {
            return request(app)
                .post(`/api/${createdTours[0]}/stops`)
                .send({ zip: 97206 })
                .then(res => {
                    expect(res.body).toEqual({
                        ...createdTours[0], stops: [{                            
                            _id: expect.any(String),
                            location: expect.any(Object),
                            weather: expect.any(Object)
                        }]
                    });
                });
        });
    });
});


