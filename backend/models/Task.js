const mongoose = require('mongoose');
const uuidv4 = require('uuid').v4;

const taskSchema = new mongoose.Schema({
    subject: {
        type: 'string',
        required: [true, 'Необходимо иметь subject для создания Task.']
    },
    questions: {
        type: 'array',
        required: [true, 'Необходимо иметь questions для создания Task.'],
        items: {
            type: 'object',
            properties: {
                data: {type: 'string', required: [true, 'Необходимо иметь questions.data для создания Task.'],},
                type: {type: 'string', required: [true, 'Необходимо иметь questions.type для создания Task.'],},
                options: {
                    type: 'array',
                    required: [true, 'Необходимо иметь questions.options[] для создания Task.'],
                    items: {
                        type: 'object', 
                        properties: {
                            data: {type: 'string', required: [true, 'Необходимо иметь questions.options.data для создания Task.'],},
                            isAnswer: {type: Boolean}
                        }
                    }
                }
            }
        }
    }
})

const addIds = function (next) {
    try {
        this.questions = this.questions.map(question => {
            question.options = question.options.map(option => {
                return Object.assign({id: uuidv4()}, option)
            })
            return Object.assign({id: uuidv4()}, question)
        })
        next();
    } catch (err) {
        next(err)
    }
}
taskSchema.pre('save', addIds);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;