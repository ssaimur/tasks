const { register, login } = require('../controllers/authController');

const router = require('express').Router();

// register a manager
router.post('/manager/register', register('managers'));

// login a manager
router.post('/manager/login', login('managers'));

// login a customer
router.post('/customer/register', register('customers'));

// login a manager
router.post('/customer/login', login('customers'));

module.exports = router;
