const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, 'Необходим login для создания User.']
    },
    password: {
        type: String,
        required: [true, 'Необходим password для создания User.']
    },
    username: {
        type: String,
        required: [true, 'Необходим username для создания User.']
    },
    nickname: {
        type: String,
        required: [true, 'Необходим nickname для создания User.']
    },
    ts: {
        type: Number,
        default: Date.now,
        required: [true, 'Необходим timestamp для создания User.']
    },
})

const hashPassword = async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (err) {
        next(err)
    }
}

userSchema.methods.correctPassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

userSchema.pre('save', hashPassword);

const User = mongoose.model('User', userSchema);
module.exports = User;