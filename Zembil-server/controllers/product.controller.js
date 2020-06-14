const mongoose = require('mongoose');
const Product = mongoose.model('Product');

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
}).array('images', 2);


module.exports.addNewProduct = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log('Error in image uploading');
        } else {
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                productName: req.body.productName,
                frontImage: req.files[1].filename,
                backImage: req.files[0].filename,
                quantity: req.body.quantity,
                supplierId: req.body.supplierId,
                unitPrice: req.body.unitPrice,
                category: req.body.category,
                isSold: req.body.isSold
            });

            product.save((err, product) => {
                if (err) {
                    res.status(500).json({ message: 'Error in saving the products = ' + err });
                } else if (!product) {
                    res.status(404).json({ message: 'Error in fetching the saved product.' });
                } else {
                    console.log(product);
                    res.status(200).json({ product: product });
                }
            });
        }
    });

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
            res.status(404).json({ message: 'Product cannot be deleted since it is sold' });
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