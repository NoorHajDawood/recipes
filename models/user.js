const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    favorites: [Number],
}, { collection: 'users' });


const User = model('User', userSchema);
module.exports = User;
