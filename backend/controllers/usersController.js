const User = require('../models/user');

exports.usersController = {
    async getUser(req, res) {
        let docs;
        const userIdParam = req.params.userId;
        try {
            docs = await User.findOne({ _id: userIdParam});

            if(docs){
                res.status(200).json({docs});
            }
            else{
                res.status(404).json({ error: `User with id : ${userIdParam} not found` });
            }
        } catch (err) {
            res.status(500).send({ error: `Error get User: ${userIdParam} : ${err}` });
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

        if (docs[0])
            res.status(200).json(docs);
        else
            res.status(200).json({ message: "There are not any users" });

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
        res.status(200).json({ message: "The User added" });

    },
    async updateUser(req, res) {

        let docs;
        try {
            docs = await User.updateOne({ _id: req.params.userId }, req.body );
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
        let docs;
        try {
            docs = await User.deleteOne({ _id: req.params.userId }, );
        } catch (err) {
            res.status(500).json({ error: `Error deleting User ${req.params.userId} : ${err}` });
            return;
        }

        if (docs.deletedCount == 1) {
            res.status(200).json({ message: `User number: ${req.params.userId} deleted  ` });
        } else {
            res.status(404).json({ error: `User number: ${req.params.userId} not found` });
        }

    }
};