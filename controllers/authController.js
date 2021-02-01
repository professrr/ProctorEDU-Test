const {
    promisify
} = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');


const createToken = (params, timeout=null) => {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: timeout || process.env.JWT_EXPIRES_IN
    });
};

exports.sign = async(req, res, next) => {
    try {

    } catch(err) {
        next(err)
    }
}

exports.createTokenPair = (path) => async (req, res, next) => {
    try {
        if(req.path !== path && path) {
            return next()
        } 
        req.token = createToken({
            
        }, '1d');
        req.refresh = createToken({
            jwt: req.token,
        }, '10d');

        next();
    } catch(err) {
        next(err)
    }
}

exports.protectJWT = async (req, res, next) => {
    try {
        // 1) check if the token is there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new AppError(401, 'fail', 'You are not logged in! Please login in to continue');
        }


        // 2) Verify token 
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        req.jwt = decode;

        next();

    } catch (err) {
        next(err);
    }
};