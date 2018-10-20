require('dotenv').config();
require('../../lib/util/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const { dropCollection } = require('./db');
const { createTours } = require('./helpers');

describe('tour routes', () => {
    let createdTours;
    let createdStops;

    const stops = [97206, 97232, 90403, 90012];

    const createStop = zip => {
        return request(app).post(`/api/tours/${createdTours[1]._id}/stops`)
            .send({ zip })
            .then(res => res.body);
    };
    
    beforeEach(() => {
        return dropCollection('tours');
    });

    beforeEach(() => {
        return createTours()
            .then(toursRes => {
                createdTours = toursRes;
            });
    });

    beforeEach(() => {
        return Promise.all(stops.map(createStop))
            .then(stopsRes => {
                createdStops = stopsRes;
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
                    stops: expect.any(Array)
                });
            });
    });

    it('gets all tours', () => {
        return request(app).get('/api/tours')
            .then(retrievedTours => {
                createdTours.forEach(createdTour => {
                    expect(retrievedTours.body).toContainEqual({ ...createdTour, stops: expect.any(Array) });
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
                .post(`/api/tours/${createdTours[0]._id}/stops`)
                .send({ zip: 97206 })
                .then(res => {
                    expect(res.body).toEqual(
                        {                            
                            _id: expect.any(String),
                            location: {
                                city: 'Portland',
                                state: 'OR',
                                zip: 97206
                            },
                            weather: expect.any(Object)
                        }
                    );
                });
        });

        it('gets all stops for a tour', () => {
            return request(app).get(`/api/tours/${createdTours[1]._id}/stops`)
                .then(res => {
                    createdStops.forEach((createdStop) => {
                        expect(res.body).toContainEqual(createdStop);
                    });
                    expect(res.body).toHaveLength(createdStops.length);
                });
        });
    });
});


