require('dotenv').config();
const location = require('../../lib/util/location');

describe('location middleware', () => {
    it('calls next when passed a zip', done => {
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

    it('calls next when passed a bad zip', done => {
        const req = {
            body: { zip: 'abc' }
        };
        
        const next = err => { 
            expect(err).toBeTruthy();
            done();
        };

        location(req, null, next);
    });

    it('adds weather info to a zip', done => {
        const req = {
            body: { zip: 97206 }
        };
        
        const next = err => { /* eslint-disable-next-line */
            // console.log(req.weather);
            expect(req.weatherLocation.location.city).toEqual('Portland');
            expect(req.weatherLocation.location.state).toEqual('OR');
            done();
        };
        location(req, null, next);
    });
});
