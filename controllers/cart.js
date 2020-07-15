const Cart = require("../models/cart");
const { errorHandler } = require("../helpers/dbErrorHandler");

//returns cart for search and create purposes
exports.cartById = (req, res, next, id) => {
    Cart.findById(id).exec((err, cart) => {
        if (err || !cart) {
            return res.status(400).json({
                error: "No cart found"
            });
        }
        req.cart = cart;
        next();
    });
};

exports.create = (req, res) => {
    const cart = new Cart(req.body);
    cart.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};
exports.read = (req, res) => {
    return res.json(req.cart);
};

exports.update = (req, res) => {
    const cart = req.cart;
    cart.name = req.body.name;
    cart.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
