const express = require('express');
const router = express.Router();
const RazorPay = require('razorpay');

const apiKey = 'rzp_test_I8a4e1StpRmkhi';
const apiSecret = 'ZYQz9pjy1Bfj8amPVfzS4a0D';

const instance = new RazorPay({
    key_id: apiKey,
    key_secret: apiSecret
})

router.post('/createOrder', (req, res, next) => {
    instance.orders.create({amount: req.body.amount,
                            currency: req.body.currency,
                            receipt: req.body.receipt,
                            payment_capture: req.body.paymentCapture,
                            notes: req.body.notes})
    .then(
        (response) => {
            res.send(resObj);
        }
    )
    .catch(
        (error) => {
            console.log(error);
            res.send(error);
        }
    );
});

module.exports = router;