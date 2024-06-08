const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    console.log(req.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: req.body.outfit_type, // Using outfit_type as the product name
            },
            unit_amount: req.body.total_amount * 100, // Converting to cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_name: req.body.user_name,
      },
      success_url: `${process.env.CLIENT_URL}`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    console.log(session.url);
    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createCheckoutSession,
};
