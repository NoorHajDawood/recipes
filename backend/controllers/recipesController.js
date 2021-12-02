const Recipe = require('../models/recipe')

exports.recipesController = {
    async getRecipe(req, res) {
        let docs;
        const recipeIdParam = req.params.recipeId;
        try {
            docs = await Recipe.findOne({ _id: recipeIdParam});
            if(docs){
                res.status(200).json({docs});
            }
            else{
                res.status(404).json({ error: `Recipe with id : ${recipeIdParam} not found` });
            }
        } catch (err) {
            res.status(500).send({ error: `Error get recipe: ${recipeIdParam} : ${err}` });
            return;
        }

    },
    async getRecipes(req, res) {
        let docs;
        try {
            docs = await Recipe.find({});
        } catch (err) {
            res.status(500).json({ error: `Error get all recipes : ${err}` });
            return;
        }

        if (docs[0]){
            res.status(200).json(docs);
        }
        else
            res.status(200).json({ message: "There are not any recipes" });

    },
    async addRecipe(req, res) {
        const newRecipe = new Recipe(req.body);
        let docs;
        try {
            docs = await newRecipe.save();
        } catch (err) {
            res.status(400).json({ error: ` ${err}` });
            return;
        }
        res.status(200).json({ message: "The recipe added" });

    },
    async updateRecipe(req, res) {

        let docs;
        try {
            docs = await Recipe.updateOne({ _id: req.params.recipeId }, req.body );
        } catch (err) {
            res.status(500).json({ error: `Error update recipe ${req.params.recipeId} : ${err}` });
            return;
        }

        if (docs.matchedCount == 1) {
            res.status(200).json({ message: "The recipe updated" });
        } else {
            res.status(404).json({ error: "Recipe id not found" });
        }

    },
    async deleteRecipe(req, res) {
        let docs;
        try {
            docs = await Recipe.deleteOne({ _id: req.params.recipeId } );
        } catch (err) {
            res.status(500).json({ error: `Error deleting recipe ${req.params.recipeId} : ${err}` });
            return;
        }

        if (docs.deletedCount == 1) {
            res.status(200).json({ message: `Recipe number: ${req.params.recipeId} deleted  ` });
        } else {
            res.status(404).json({ error: `Recipe number: ${req.params.recipeId} not found` });
        }

    }
};