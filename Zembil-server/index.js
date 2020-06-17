require('./config/config');
require('./models/connection');
require('./config/passport-config'); //  for authentication
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const csrf = require('csurf');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport'); // for authentication

const rtsUser = require('./routes/user.router');
const rtsProduct = require('./routes/product.router');
const rtsCart = require('./routes/cart.router');
const rtsOrder = require('./routes/order.router');

const rtsAddress = require('./routes/address.router');

const rtsCreditCard = require('./routes/creditCard.router'); // from mihreteab


var app = express();
var csrfProtection = csrf({ cookie: true })

// add the middleware

app.use(bodyparser.json());
app.use(cookieParser());
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: { maxAge: 180 * 60 * 1000 }

}));
app.use(cors());
app.use(passport.initialize()); // for authentication
app.use(cookieParser());
app.use(flash());
app.use('/api/v1/users', rtsUser);
app.use('/api/v1/products', rtsProduct);
app.use('/api/v1/cart', rtsCart);
app.use('/api/v1/orders', rtsOrder);
app.use('/api/v1/address', rtsAddress)
app.use('/api/v1/creditCards', rtsCreditCard);

app.use('/api/v1/creditCards', rtsCreditCard);


app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

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