const mongoose = require('mongoose');
var sendmail = require('../config/mailSender');
const Product = mongoose.model('Product');
const Review = mongoose.model('Review');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname + '-' + path.extname(file.originalname));
    }
});

// const upload = multer({
//     storage: storage
// }).single('imageUrl');

const upload = multer({
    storage: storage
}).single('image');


module.exports.addNewProduct = (req, res, next) => {
    console.log('adding new product......');
    // upload(req, res, (err) => {
    //     if (err) {
    //         console.log('Error in image uploading');
    //     } else {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        imageUrl: req.body.imageUrl,
        // frontImage: req.files[1].filename,
        // backImage: req.files[0].filename,
        quantity: req.body.quantity,
        supplierId: req.params.supplierid,
        unitPrice: req.body.unitPrice,
        category: req.body.category,
        isSold: false
    });
    product.save((err, product) => {
        if (err) {
            res.status(500).json({ message: 'Error in saving the products = ' + err });
        } else if (!product) {
            res.status(404).json({ message: 'Error in fetching the saved product.' });
        } else {
            // send email to customers subscribed
            res.status(200).json({ product: product });
            // sendmail.send();
        }
    });
    //     // }
    // });

}
module.exports.getAllProducts = (req, res, next) => {
    Product.find((err, products) => {
        if (err) {
            res.status(500).json({ message: 'Error in reading products.' });
        } else if (!products) {
            res.status(404).json({ message: 'No products found' });
        } else {
            res.status(200).json({ products: products });
        }
    });
}



module.exports.getProductBySeller = (req, res, next) => {
    console.log('getting product');
    const seller = req.params.userid;

    const filter = { supplierId: seller };
    Product.find(filter, (err, products) => {
        if (err) {
            res.status(500).json({ message: 'Error in reading products.' });
        } else if (!products) {
            res.status(404).json({ message: 'No products found' });
        } else {
            res.status(200).json({ products: products });
        }
    });
}

module.exports.getProductDetails = (req, res, next) => {
    const productid = req.params.productid;
    const filter = { _id: productid };
    Product.find(filter, (err, product) => {
        if (err) {
            res.status(500).json({ message: 'Error in reading product.' });
        } else if (!product) {
            res.status(404).json({ message: 'No product found' });
        } else {
            res.status(200).json({ product: product });
        }
    });

}
module.exports.deleteProduct = (req, res, next) => {
    const productid = req.params.productid;
    const filter = { _id: productid };
    Product.findOne(filter, (err, product) => {
        if (err) {
            res.status(500).json({ message: 'Error in deleting a product.' });
        } else if (!product) {
            res.status(404).json({ message: 'Product not found.' });
        } else if (!product.isSold) {
            Product.findOneAndDelete(filter, (err, product) => {
                if (err) {
                    res.status(500).json({ message: 'Error in deleting a product.' });
                } else if (!product) {
                    res.status(404).json({ message: 'No product found' });
                } else {
                    res.status(200).json({ product: product });
                }
            });
        } else {
            res.send({ message: 'Product cannot be deleted since it is sold' });
        }
    });

}

module.exports.updateProductDetails = (req, res, next) => {
    var newProductDetail = {
        productName: req.body.productName,
        quantity: req.body.quantity,
        imageUrl: req.body.imageUrl,
        unitPrice: req.body.unitPrice,
        category: req.body.category
    }
    Product.findByIdAndUpdate(req.params.productid, { $set: newProductDetail }, { new: true }, (err, product) => {
        if (!err) {
            res.status(200).json({ product: product });
        } else if (!product) {
            res.status(404).json({ message: 'Product not found.' })
        } else
            res.status(500).json({ message: 'Unable to update the product details.' })
    });
}
module.exports.updateQuantity = (req, res, next) => {
        var newProductDetail = {
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice
        }
        Product.findByIdAndUpdate(req.params.productid, {
                $inc: { quantity: newProductDetail.quantity },
                unitPrice: newProductDetail.unitPrice
            }, { new: true },
            (err, product) => {

                if (!err) {
                    res.status(200).json({ product: product });
                } else if (!product) {
                    res.status(404).json({ message: 'There is no product with the id provided.' })
                } else
                    res.status(500).json({ message: 'Unable to update the product details.' })
            });
    }
    //product review routes

module.exports.addNewReview = async(req, res, next) => {
    console.log('in add review');

    const user = req.params.userid;
    const prodid = req.body.product;
    console.log(user);
    console.log(req.body.comment);

    const myComment = req.body.comment

    const newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        product: prodid,
        reviews: [{
            user: user,
            comment: myComment
        }]

    });
    reviewmodel = {
        user: user,
        comment: myComment
    }

    const customerReview = await Review.find({ product: prodid });
    console.log(customerReview);
    if (customerReview.length > 0) {
        //push new comments
        console.log("length > 0");

        Review.findOneAndUpdate({
            _id: customerReview._id
        }, {
            $push: {
                "reviews": reviewmodel
            }
        }, (err, updated) => {
            console.log(updated);
        });
        customerReview[0].save();

        res.status(200).json({ message: 'New  Review succesfully pushed' });
    } else {
        console.log("else condi");
        //save reviw for new product
        newReview.save((err, rev) => {
            if (err) {
                res.status(500).json({ message: 'Eror is saving Review' })
            } else if (!rev) {
                res.status(404).json({ message: 'review not found' })
            } else {
                res.status(200).json({ message: rev })
            }
        })
    }
    // if (customerReviews.length>0){}



}
module.exports.getAllReviews = (req, res, next) => {

    Review.find({ product: prodid }, (err, review) => {
        if (!err) {
            if (review.length > 0)
                res.status(200).json({ review: review[0].reviews });
            else
                res.send({ message: 'No reviews found' })
        } else {
            res.send({ message: 'No Review object' })
        }
    })
}