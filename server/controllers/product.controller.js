const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = (req, res) => {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save((err) => {
        if(err){
            return next(err);
        }
        res.send('Product Successfully Created');
    })
};

exports.product_details = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if(err) return next(err);
        res.send(product);
    });
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err) => {
        if (err) return next(err);
        res.send('Deleted Successfully');
    })
};