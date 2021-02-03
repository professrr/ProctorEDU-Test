const mongoose = require('mongoose');

const proctorSchema = new mongoose.Schema({
    id : {type: String, required: true},
    status: {type: String},
    duration : {type: Number},
    startedAt: {type: Date},
    stoppedAt: {type: Date},
    score: {type: Number},
    averages: {type: Object},
    student: {type: String},
    proctor: {type: String},
    comment: {type: String},
    signedAt: {type: Date},
    conclusion: {type: String},
    link: {type: String},
})

const Proctoring = mongoose.model('Proctoring', proctorSchema);
module.exports = Proctoring;