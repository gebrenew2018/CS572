const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken'); // for authentication

var userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: 'User Id cannot be empty'
    },
    firstName: {
        type: String,
        required: 'First Name cannot be empty'
    },
    lastName: {
        type: String,
        required: 'Last Name cannot be empty'
    },
    email: {
        type: String,
        required: 'Email cannot be empty',
        unique: true
    },
    telephone: {
        type: Number
    },
    role: {
        type: Number
    },
    password: {
        type: String,
        required: 'Password cannot be empty',
        minlength: [5, 'Password must be at lease 5 characters']
    },
    secret: {
        type: String
    },
    status: {
        type: String
    },
    address: {
        type: String,
        ref: "Address"
    }
});

// for the password secret
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        //encrypt the password
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.secret = salt;
            next();
        });
    });
});


// for email validation using regular expression

userSchema.path('email').validate((val) => {
    emailRegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegExp.test(val);
}, 'Invalid Email address.');

// methods

userSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        });
}

mongoose.model('User', userSchema);