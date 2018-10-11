require('dotenv').config();
const location = require('../../lib/util/location');

function addWeather(zip) {
            
}

describe('location middleware', () => {
    it('calls next', () => {
        const req = {
            body: { zip: 97206 }
        };

        let called = false;

        let error;

        const next = err => {
            error = err;
            called = true;
        };

        

        location(req, null, next);
        expect(called).toBeTruthy();
    });

    it('adds weather info to a zip', () => {
        const req = {
            body: { zip: 97206 }
        };
        
        const next = err => {
        };

        location(req, null, next);

        expect(req.weather).toEqual('something');
    });
});
