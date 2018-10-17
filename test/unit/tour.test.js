const { getErrors } = require('./helpers');
const Tour = require('../../lib/models/Tour');

describe('Tour model', () => {
    it('validates a good model', () => {
        const data = {
            title: 'Benny\'s Big-Top',
            activities: [
                'Clown-Hunting',
                'Pie-Appraising',
                'Pig-Mimicking'
            ],
            stops: []
        };

        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        expect(jsonTour).toEqual({ ...data, _id: expect.any(Object), launchDate: expect.any(Date) });
    });
    
    it('requires a title', () => {
        const tour = new Tour({
            activities: [
                'Clown-Hunting',
                'Pie-Appraising',
                'Pig-Mimicking'
            ],
            stops: []
        });

        const errors = getErrors(tour.validateSync(), 1);

        expect(errors.title.kind).toEqual('required');
    });
});
