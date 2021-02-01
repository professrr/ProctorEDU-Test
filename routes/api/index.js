const express = require('express');
const router = express.Router();
const globalErrHandler = require('../../controllers/errorController');
const AppError = require('../../utils/appError');
const AuthController = require('../../controllers/authController');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "HelloWorld"
    })
})

router.post('/', );

router.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

router.use(globalErrHandler);

module.exports = router;