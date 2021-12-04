const User = require('../models/user');
const Recipe = require('../models/recipe')
const { isAuthorized } = require('../controllers/sessionsController')

async function recipesAndFavorites(myRecipes, favorites) {
    let result = {};
    let recipes;
    let favs;
    try {
        recipes = await Recipe.find({ _id: { $in: myRecipes } });
    } catch (err) {
        recipes = []
        return;
    }
    try {
        favs = await Recipe.find({ _id: { $in: favorites } });
    } catch (err) {
        recipes = []
        return;
    }

    result.myRecipes = recipes.map(recipe => {
        return {
            _id: recipe.id,
            img: recipe.imageUrl
        };
    });

    result.favorites = favs.map(recipe => {
        return {
            _id: recipe.id,
            img: recipe.imageUrl
        };
    });

    return result;
}

exports.usersController = {
    async getUser(req, res) {
        let docs;
        const userIdParam = req.params.userId;
        try {
            docs = await User.findOne({ _id: userIdParam });
            if (docs) {
                docs = docs.toJSON();
                const recipes = await recipesAndFavorites(docs.myRecipes, docs.favorites);
                delete docs.password;
                docs.myRecipes = recipes.myRecipes;
                docs.favorites = recipes.favorites;
                res.status(200).json(docs);
            }
            else {
                res.status(404).json({ error: `User with id : ${userIdParam} not found` });
            }
        } catch (err) {
            res.status(500).json({ error: `Error get User: ${userIdParam} : ${err}` });
            return;
        }

    },
    async getUsers(req, res) {
        let docs;
        try {
            docs = await User.find({});
        } catch (err) {
            res.status(500).json({ error: `Error get all users : ${err}` });
            return;
        }

        let recipes;
        result = [];
        for (let user of docs) {
            user = user.toJSON();
            recipes = await recipesAndFavorites(user.myRecipes, user.favorites);
            delete user.password;
            user.myRecipes = recipes.myRecipes;
            user.favorites = recipes.favorites;
            result.push(user);
        }
        res.status(200).json(result);
    },
    async addUser(req, res) {
        const newUser = new User(req.body);
        let docs;
        try {
            docs = await newUser.save();
        } catch (err) {
            res.status(400).json({ error: ` ${err}` });
            return;
        }
        res.status(200).json({ _id: docs.id });

    },
    async updateUser(req, res) {
        if (!isAuthorized(req) || req.session.userId != req.params.userId) {
            res.status(401).json({ error: 'Unauthorized to update this user' });
            return;
        }
        let docs;
        try {
            docs = await User.updateOne({ _id: req.params.userId }, req.body);
        } catch (err) {
            res.status(500).json({ error: `Error update User ${req.params.userId} : ${err}` });
            return;
        }

        if (docs.matchedCount == 1) {
            res.status(200).json({ message: "The User updated" });
        } else {
            res.status(404).json({ error: "User id not found" });
        }
    },
    async deleteUser(req, res) {
        if (!isAuthorized(req) || req.session.userId != req.params.userId) {
            res.status(401).json({ error: 'Unauthorized to delete this user' });
            return;
        }
        let docs;
        try {
            docs = await User.deleteOne({ _id: req.params.userId });
        } catch (err) {
            res.status(500).json({ error: `Error deleting User ${req.params.userId} : ${err}` });
            return;
        }

        if (docs.deletedCount == 1) {
            res.status(200).json({ message: `User number: ${req.params.userId} deleted` });
        } else {
            res.status(404).json({ error: `User number: ${req.params.userId} not found` });
        }

    }
};