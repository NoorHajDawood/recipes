const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    userImg: { type: String },
    desc: { type: String },
    myRecipes: [String],
    favorites: [String],
    session: {}
}, { collection: 'users' });


const User = model('User', userSchema);
module.exports = User;
