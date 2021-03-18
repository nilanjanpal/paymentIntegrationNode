const stripe = require('stripe')('sk_test_51IRBIKI5IyHb9l597gES1sdUxSwXThpfgHICQj8p3zOGzAG7bEHshHXN9hc6Cfg6WVm04xZvcZ7mfEQgsKQA9C8J00e69FEnnk');

exports.checkout = (req, res, next) => {
    const sessionRequest = {
        payment_method_types: [... req.body.paymentTypes],
        line_items: [
            {
                price_data: {
                    currency: req.body.currency,
                    product_data: {
                        name: 'Test Product'
                    },
                    unit_amount: req.body.amount * 100
                },
                quantity: req.body.quantity
            }
        ],
        customer_email: req.body.email,
        mode: 'payment',
        success_url: 'https://payment-integration-8573c.web.app/',
        cancel_url: 'https://payment-integration-8573c.web.app/'
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
    
}