const RazorPay = require('razorpay');

const apiKey = 'rzp_test_I8a4e1StpRmkhi';
const apiSecret = 'ZYQz9pjy1Bfj8amPVfzS4a0D';

const instance = new RazorPay({
    key_id: apiKey,
    key_secret: apiSecret
});

exports.createOrder = (req, res, next) => {
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
}