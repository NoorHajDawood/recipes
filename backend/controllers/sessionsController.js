const User = require('../models/user');

exports.sessionsController = {
    async login(req, res) {
        let user;
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(403).json({ error: 'Missing username or password' });
            return;
        }
        try {
            user = await User.findOne({ email: email });
        } catch (err) {
            res.status(500).json({ error: `Error get User: ${email} : ${err}` });
            return;
        }
        if (user) {
            if (password == user.password) {
                user.session = req.session;
                user.session.sessionID = req.sessionID;
                // user.session.userId = user.id;
            }
            else {
                res.status(403).json({ error: 'Invalid password' });
                return;
            }

            try {
                await User.updateOne({ _id: user.id }, { session: user.session });
                res.redirect(`/api/users/${user.id}`);
            } catch (err) {
                res.status(500).json({ error: `Error updating session for User ${user.id} : ${err}` });
                return;
            }
        }
        else {
            res.status(404).json({ error: `User with email : ${email} not found` });
        }
    },
    async logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    isAuthorized(req) {
        return req.session ; // && req.session.userId
    }
};