const {
    promisify
} = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const User = require('../models/User');


const createToken = (params, timeout=null) => {
    return jwt.sign(params, process.env.JWT_SECRET, {
        expiresIn: timeout || process.env.JWT_EXPIRES_IN
    });
};

exports.findUser = (path) => async (req, res, next) => {
    try {
        if(req.path !== path && path) {
            return next()
        }

        const {login} = req.body;

        req.user = await User.findOne({login});

        next();

    } catch(err) {
        next(err)
    }
}

exports.comparePasswords = (path) => async (req, res, next) => {
    try {
        if(!req.user || (req.path !== path && path)) {
            return next()
        }
        const {password} = req.body
        const correct = await req.user.correctPassword(password, req.user.password);
        if(!correct) {
            throw new AppError(401, 'fail', 'Логин или пароль не верные')
        }
        next()
    } catch(err) {
        next(err)
    }
}

exports.createNewUser = (path) => async (req, res, next) => {
    try {
        if(req.user || (req.path !== path && path)) {
            return next()
        } 

        const {login, password, username, nickname} = req.body;
            
        // 2.2) Создание нового пользователя
        req.user = await User.create({
            login,
            password,
            username,
            nickname,
        })

        next();
    } catch(err) {
        next(err)
    }
}

exports.sign = async(req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Пользователь успешно подписался.',
            jwt: {token: req.token, refresh: req.refresh},
            data: {user: req.user}
        });
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
            username: req.user.id,
            nickname: req.user.nickname,
            id: req.task.id,
            subject: req.task.subject,
            tags: [req.user.nickname]
        }, '1d');
        req.refresh = createToken({
            jwt: req.token,
            id: req.user.id
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