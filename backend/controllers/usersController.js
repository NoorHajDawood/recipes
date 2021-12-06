const User = require('../models/user');
const Recipe = require('../models/recipe');

async function recipesAndFavoritesStringToObject(myRecipes, favorites) {
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

async function updateReturnedUser(user) {
    user = user.toJSON();
    const recipes = await recipesAndFavoritesStringToObject(user.myRecipes, user.favorites);
    delete user.password;
    user.myRecipes = recipes.myRecipes;
    user.favorites = recipes.favorites;
    return user;
}

async function recipesAndFavoritesObjectToString(myRecipes, favorites) {
    let result = {};

    result.myRecipes = myRecipes.map(recipe => {
        return recipe._id;
    });

    result.favorites = favorites.map(recipe => {
        return recipe._id;
    });

    return result;
}

exports.usersController = {
    async getUser(req, res) {
        let user;
        const userIdParam = req.params.userId;
        try {
            user = await User.findOne({ _id: userIdParam });
            if (user) {
                user = await updateReturnedUser(user);
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: `User with id : ${userIdParam} not found` });
            }
        } catch (err) {
            res.status(500).json({ error: `Error get User: ${userIdParam} : ${err}` });
            return;
        }

    },
    async getUsers(req, res) {
        let users;
        try {
            users = await User.find({});
        } catch (err) {
            res.status(500).json({ error: `Error get all users : ${err}` });
            return;
        }

        let recipes;
        result = [];
        for (let user of users) {
            user = await updateReturnedUser(user);
            result.push(user);
        }
        res.status(200).json(result);
    },
    async addUser(req, res) {
        const newUser = new User(req.body);
        let user;
        try {
            user = await newUser.save();
            user = await updateReturnedUser(user);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ error: ` ${err}` });
            return;
        }

    },
    async updateUser(req, res) {
        // if (!req.session || !req.session.userId || req.session.userId != req.params.userId) {
        //     res.status(401).json({ error: 'Unauthorized to update this user' });
        //     return;
        // }
        let updateResult;
        const user = req.body;
        const recipes = await recipesAndFavoritesObjectToString(user.myRecipes, user.favorites);
        user.myRecipes = recipes.myRecipes;
        user.favorites = recipes.favorites;
        try {
            updateResult = await User.updateOne({ _id: req.params.userId }, user);
        } catch (err) {
            res.status(500).json({ error: `Error update User ${req.params.userId} : ${err}` });
            return;
        }

        if (updateResult.matchedCount == 1) {
            res.status(200).json({ message: "The User updated" });
        } else {
            res.status(404).json({ error: "User id not found" });
        }
    },
    async deleteUser(req, res) {
        // if (!req.session || !req.session.userId || req.session.userId != req.params.userId) {
        //     res.status(401).json({ error: 'Unauthorized to delete this user' });
        //     return;
        // }
        let deleteResult;
        try {
            deleteResult = await User.deleteOne({ _id: req.params.userId });
        } catch (err) {
            res.status(500).json({ error: `Error deleting User ${req.params.userId} : ${err}` });
            return;
        }

        if (deleteResult.deletedCount == 1) {
            res.status(200).json({ message: `User number: ${req.params.userId} deleted` });
        } else {
            res.status(404).json({ error: `User number: ${req.params.userId} not found` });
        }

    }
};