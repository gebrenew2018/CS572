require('./config/config');
require('./models/connection');
require('./config/passport-config'); //  for authentication
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport'); // for authentication

const rtsUser = require('./routes/user.router');
const rtsProduct = require('./routes/product.router');


const rtsCreditCard = require('./routes/creditCard.router'); // from mihreteab


var app = express();


// add the middleware

app.use(bodyparser.json());
app.use(cors());
app.use(passport.initialize()); // for authentication

app.use('/api/v1/users', rtsUser);
app.use('/api/v1/products', rtsProduct);

app.use('/api/v1/creditCards', rtsCreditCard); // from mihreteab


// global error handling

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server Started at port :${process.env.PORT}`);
});