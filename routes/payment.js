const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controller/payment');

router.post('/checkout', createCheckoutSession);

module.exports = router;
