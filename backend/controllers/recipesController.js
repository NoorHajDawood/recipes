const Recipe = require('../models/recipe')

exports.recipesController = {
    async getRecipe(req, res) {
        let docs;
        const recipeIdParam = req.params.recipeId;
        try {
            docs = await Recipe.findOne({ _id: recipeIdParam });
            if (docs) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({ error: `Recipe with id : ${recipeIdParam} not found` });
            }
        } catch (err) {
            res.status(500).json({ error: `Error get recipe: ${recipeIdParam} : ${err}` });
            return;
        }

    },
    async getRecipes(req, res) {

        let docs;
        try {
            const filter = {};
            if (req.query && req.query.title) {
                filter.title = new RegExp(req.query.title, 'i');
            }
            const sort = {};
            if (req.query && req.query.sort) {
                if (req.query.sort == 'title' || req.query.sort == 'prepTime') {
                    sort[req.query.sort] = 1;
                } else if (req.query.sort == 'likes') {
                    sort[req.query.sort] = -1;
                }
            }
            // .sort({'title': 1})
            // sort['title'] = 1
            docs = await Recipe.find(filter).sort(sort);

        } catch (err) {
            res.status(500).json({ error: `Error get all recipes : ${err}` });
            return;
        }

        if (docs) {
            res.status(200).json(docs);
        } else
            res.status(500).json({ error: `Couldn't retrieve recipes` });

    },
    async addRecipe(req, res) {
        // if (!req.session || !req.session.userId) {
        //     res.status(401).json({ error: 'Unauthorized to add a recipe' });
        //     return;
        // }
        const newRecipe = new Recipe(req.body);
        let docs;
        try {
            docs = await newRecipe.save();
        } catch (err) {
            res.status(400).json({ error: ` ${err}` });
            return;
        }
        res.status(200).json(docs);

    },
    async updateRecipe(req, res) {
        // if (!req.session || !req.session.userId) {
        //     res.status(401).json({ error: 'Unauthorized to update this recipe' });
        //     return;
        // }
        let recipe;
        try {
            recipe = await Recipe.updateOne({ _id: req.params.recipeId }, req.body);
        } catch (err) {
            res.status(500).json({ error: `Error update recipe ${req.params.recipeId} : ${err}` });
            return;
        }

        if (recipe.matchedCount == 1) {
            // res.status(200).json({ message: "The recipe updated" });
            try {
                recipe = await Recipe.findOne({ _id: req.params.recipeId });
            } catch (err) {
                res.status(500).json({ error: `Error getting recipe ${req.params.recipeId} : ${err}` });
                return;
            }
            res.json(recipe);
        } else {
            res.status(404).json({ error: "Recipe id not found" });
        }
    },
    async deleteRecipe(req, res) {
        // if (!req.session || !req.session.userId) {
        //     res.status(401).json({ error: 'Unauthorized to delete this recipe' });
        //     return;
        // }
        let docs;
        try {
            docs = await Recipe.deleteOne({ _id: req.params.recipeId });
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