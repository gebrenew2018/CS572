const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var reviewSchema = new Schema({
    user: {
        type: String
    },
    product: {
        type: String,
        ref: 'User',
        required: 'User is required.'
    },
    comment: [{
        type: String
    }]
});
mongoose.model('Review', reviewSchema);