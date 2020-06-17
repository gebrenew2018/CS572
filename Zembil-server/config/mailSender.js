const nodemailer = require('nodemailer');
module.exports.send = (req, res, next) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gebreonline@gmail.com',
            pass: 'password'
        }
    });
    //select all my subscribers from subscriptions collection
    var mail = {
        from: 'gebronline@gmail.com',
        to: 'gebrescholar2018@gmail.com,gebrenew2012@gmail.com,ggebreegziyabher@gmail.com',
        subject: 'New peoduct available',
        text: `Congratulations! We have a new product please check it out - product url`
    };
    transporter.sendMail(mail, (err, info) => {

        if (err) {
            console.log('Error in sending email.');
        } else {
            console.log('Email sent:' + info.response);

        }
    })
}