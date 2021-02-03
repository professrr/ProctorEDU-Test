const express = require('express');
const router = express.Router();
const globalErrHandler = require('../../controllers/errorController');
const AppError = require('../../utils/appError');
const AuthController = require('../../controllers/authController');
const TaskController = require('../../controllers/taskController');

router.post('/create/task', TaskController.create);
router.post('/proctoring', TaskController.receiveProctoring)

router.use(TaskController.withTask('/sign'))
router.use(AuthController.findUser('/sign'))
router.use(AuthController.comparePasswords('/sign'))
router.use(AuthController.createNewUser('/sign'))
router.use(AuthController.createTokenPair('/sign'))
router.post('/sign', AuthController.sign)

router.use(AuthController.protectJWT)
router.use(TaskController.withTask('/task'))
router.get('/task', TaskController.getOne)

router.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

router.use(globalErrHandler);

module.exports = router;