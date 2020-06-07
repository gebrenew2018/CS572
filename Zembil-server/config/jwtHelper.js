const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    if (!token)
        res.status(403).send({ auth: false, message: 'Please login first.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Unauthorized user!.' })
                else {
                    req._id = decoded._id;
                    next();
                }
            })
    }
}