const nodemailer = require('nodemailer');
module.exports.send = (email) => {
    console.log('DETAIL:', email);
    const orderid = email.orderid;
    const receiveremail = email.email;
    const orderstatus = email.status;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zembillive@gmail.com',
            pass: 'password' //encrypted password
        }
    });
    //select all my subscribers from subscriptions collection
    var mail = {
        from: 'zembillive@gmail.com',
        to: receiveremail,
        subject: 'Order Status',
        text: `Order Confirmation! Your order with order status ` + orderid + ` is ` + orderstatus
    };
    transporter.sendMail(mail, (err, info) => {

        if (err) {
            console.log('Error in sending email.' + err);
        } else {
            console.log('Email sent:' + info.response);

        }
    })
}