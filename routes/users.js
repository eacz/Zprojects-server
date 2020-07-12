const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { check } = require('express-validator');

// /api/users
router.post(
    '/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'Put a valid email').isEmail(),
        check(
            'password',
            'The password must have at least 8 characters'
        ).isLength({ min: 8 }),
    ],
    userController.createUser
);

module.exports = router;
