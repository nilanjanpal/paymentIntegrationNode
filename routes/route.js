const express = require('express');
const router = express.Router();
const RazorPay = require('razorpay');
const stripe = require('stripe')('sk_test_51IRBIKI5IyHb9l597gES1sdUxSwXThpfgHICQj8p3zOGzAG7bEHshHXN9hc6Cfg6WVm04xZvcZ7mfEQgsKQA9C8J00e69FEnnk');

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
            resObj = {id: response.id,apiKey: apiKey }
            res.status(200).send(resObj);
        }
    )
    .catch(
        (error) => {
            console.log(error);
            res.status(400).send(error);
        }
    );
});

router.post('/checkoutStripe', (req, res, next) => {
    const sessionRequest = {
        payment_method_types: [... req.body.paymentTypes],
        line_items: [
            {
                price_data: {
                    currency: req.body.currency,
                    product_data: {
                        name: 'Test Product'
                    },
                    unit_amount: req.body.amount
                },
                quantity: req.body.quantity
            }
        ],
        customer_email: req.body.email,
        mode: 'payment',
        success_url: 'https://paymentintegrtn.herokuapp.com/index.html',
        cancel_url: 'https://paymentintegrtn.herokuapp.com/index.html'
        // success_url: 'http://localhost:4200/index.html',
        // cancel_url: 'http://localhost:4200/index.html',
    };
    console.log(sessionRequest);
    stripe.checkout.sessions.create(sessionRequest)
    .then(
        (response) => {
            console.log(response);
            res.status(200).send({id: response.id});
        }
    )
    .catch(
        (error) => {
            console.log(error);
            res.status(401).send({error: error});
        }
    );
    
})

module.exports = router;