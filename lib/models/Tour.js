const mongoose = require('mongoose');

let states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    activities: {
        type: [String],
        required: true
    },
    launchDate: {
        type: Date,
        default: Date.now() /* default to now */
    },
    stops:[
        {
            location: {
                city: String,
                state: {
                    type: String,
                    enum: states,
                },
                zip: Number
            },
            weather: {
                //choose 3-4 fields
            },
            attendance: {
                type: Number,
                min: 1
            }
        }
    ] 
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
