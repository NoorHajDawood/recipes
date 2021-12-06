const express = require("express");
const session = require('express-session');
const cors = require('cors');
const { sessionsRouter } = require("./routers/sessionsRouter");
const { recipesRouter } = require("./routers/recipesRouter");
const { usersRouter } = require("./routers/usersRouter");
const { SESSION_SECRET } = require("./constants");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({credentials: true, origin: true}));
const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

app.use(corsConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    resave: false
}));

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
})

app.use(express.static('public'));

app.use('/api/sessions', sessionsRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
    res.status(404).send(`Page not found`);
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));