const User = require('../models/user');

exports.sessionsController = {
    async login(req, res) {
        let docs;
        const userIdParam = req.params.userId;
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(403).json({ error: 'Missing username or password' });
            return;
        }
        try {
            docs = await User.findOne({ email: email });
        } catch (err) {
            res.status(500).json({ error: `Error get User: ${userIdParam} : ${err}` });
            return;
        }

        if (docs) {
            if (password == docs.password) {
                docs.session = req.session;
                docs.session.sessionID = req.sessionID;
                docs.session.userId = docs.id;
            }
            else {
                res.status(403).json({ error: 'Invalid password' });
                return;
            }

            try {
                await User.updateOne({ _id: docs.id }, { session: docs.session });
                res.redirect(`/api/users/${docs.id}`)
            } catch (err) {
                res.status(500).json({ error: `Error updating session for User ${req.params.userId} : ${err}` });
                return;
            }
        }
        else {
            res.status(404).json({ error: `User with id : ${userIdParam} not found` });
        }
    },
    async logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    isAuthorized(req) {
        return req.session && req.session.userId;
    }
};