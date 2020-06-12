const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var reviewSchema = new Schema({
    user: {
        type: String,
        ref: 'User',
        required: 'User is required.'
    },
    rating: {
        type: Number,
        required: 'Rating cannot be empty'
    },
    comment: {
        type: String
    },
    dateTime: {
        type: Date
    }
});
mongoose.model('Review', reviewSchema);