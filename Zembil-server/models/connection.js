const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (!err) {
        console.log('Connection succeeded');
    } else {
        console.log('Error in connecting to the database' + JSON.stringify(err, undefined, 2));
    }
});

require('./user.model')
require('./product.model')
require('./review.model')
require('./address.model');