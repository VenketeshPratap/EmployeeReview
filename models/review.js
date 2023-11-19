const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    content: {
        type: 'String',
        require: true
    },
    reviewTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewBy_name: {
        type: 'String',
        require: true
    }
},
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;