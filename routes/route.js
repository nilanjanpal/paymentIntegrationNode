const express = require('express');
const router = express.Router();
const address = require('./../controllers/address');
const razorpay = require('./../controllers/razorpay');
const stripe = require('./../controllers/stripe');

router.post('/fetchAddress', address.fetchAddress);

router.post('/createOrder', razorpay.createOrder);

router.post('/checkoutStripe', stripe.checkout);

module.exports = router;