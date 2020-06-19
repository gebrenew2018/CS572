const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var reviewSchema = new Schema({
    _id: {
        type: String
    },

    product: {
        type: String
    },
    reviews: [{
        user: {
            type: String
        },
        comment: {
            type: String
        }

    }]
});
mongoose.model('Review', reviewSchema);