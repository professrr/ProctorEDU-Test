const Task = require('../models/Task');
const AppError = require('../utils/appError');

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