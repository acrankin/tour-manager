require('dotenv').config();
const location = require('../../lib/util/location');

describe('location middleware', () => {
    it('calls next', done => {
        const req = {
            body: { zip: 97206 }
        };

        let called = false;
        let error;

        const next = err => {
            error = err;
            called = true;
            expect(called).toBeTruthy();
            done();
        };

        location(req, null, next);
    });

    it('adds weather info to a zip', done => {
        const req = {
            body: { zip: 97206 }
        };
        
        const next = err => {
            console.log(req.weather);
            expect(req.weather.location.city).toEqual('Portland');
            expect(req.weather.location.state).toEqual('OR');
            done();
        };

        location(req, null, next);
    });
});
