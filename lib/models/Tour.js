const mongoose = require('mongoose');

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
        type: Date /* default to now */
    },
    stops:[
        {
            location: {
                city: {
                    type: String,
                    required: true
                },
                state: {
                    type: String,
                    enum: states,
                    required: true
                },
                zip: {
                    type: Number,
                    required: true
                }
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
