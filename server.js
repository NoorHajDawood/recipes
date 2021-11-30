const express = require("express");
const { recipesRouter } = require("./routers/recipesRouter");
const { usersRouter } = require("./routers/usersRouter");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// check pass?
// app.use(checkpass);
app.use('/api/recipes', recipesRouter);
app.use('/api/users',usersRouter);

app.use((req, res) => {
    res.status(404).send(`Page not found`);
});

app.listen(port, () => console.log(`Express server is running on port ${port}`));