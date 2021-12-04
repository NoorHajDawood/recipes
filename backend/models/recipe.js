const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    prepTime: { type: String, required: true },
    serving: { type: Number, required: true },
    memberId: { type: String, required: true },
    ingredients: [{
        "name": { type: String, required: true },
        "quantity": { type: Number, required: true },
        "unit": { type: String, required: true }
    }],
    serving: { type: Number, required: true },
    instructions: [String],
    likes: { type: Number },
}, { collection: 'recipes' });


const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;