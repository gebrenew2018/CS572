//check the environment
var env = process.env.NODE_ENV || 'development';

// fetch the config.json
var config = require('./config.json')

var envConfig =config[env];

//add environment config values to process environment

Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);