const Task = require('../models/Task');
const Proctoring = require('../models/Proctoring');
const AppError = require('../utils/appError');

exports.receiveProctoring = async(req, res, next) => {
    try {
        const secret = req.headers['x-api-key']
        
        if(secret != 'secret') {
            throw new AppError(401, 'fail', 'Источник не верифицирован')
        }

        const created_proctoring = await Proctoring.create(req.body)

        res.status(200).json({
            status: 'success',
            data: created_proctoring
        });
    } catch(err) {
        next(err)
    }
}

exports.create = async(req, res, next) => {
    try {
        const {task} = req.body;

        if(!task) {
            throw new AppError(404, 'fail', 'Обязательный параметр - объект task')
        }

        const created_task = await Task.create(task);

        res.status(201).json({
            status: 'success',
            data: created_task
        });

    } catch(err) {
        next(err)
    }
}

exports.withTask = (path) => async (req, res, next) => {
    try {
        if(req.path !== path && path) {
            return next()
        } 
        req.task = await Task.findOne();
        if(!req.task) {
            throw new AppError(404, 'fail', 'No Task found');
        }

        next();
    } catch(err) {
        next(err)
    }
}

exports.getOne = (req, res, next) => {
    try {
        res.status(201).json({
            status: 'success',
            data: req.task
        });
    } catch(err) {
        next(err)
    }
}