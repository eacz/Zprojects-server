const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')

//  /api/auth
router.post(
    '/',
    /*[
        check('email', 'Put a valid email').isEmail(),
        check(
            'password',
            'The password must have at least 8 characters'
        ).isLength({ min: 8 }),
    ],*/
    authController.authUser)

router.get('/', auth, authController.getAuthUser)

module.exports = router;
