/*import { Schema, model } from 'mongoose';
//models

const resettokenSchema = new Schema({
_userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
resettoken: { type: String, required: true },
createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});


export default model('passwordResetToken', resettokenSchema);*/
// models
const mongoose = require('mongoose');


const resettokenSchema = new mongoose.Schema({
_userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
resettoken: { type: String, required: true },
createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});


module.exports = mongoose.model('passwordResetToken', resettokenSchema);
