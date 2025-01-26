const express = require("express");
const connectDB = require("./db"); // Use require without destructuring
const app = express();

connectDB();

app.get("/try", (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.listen(3000, () => {
    console.log("server is Started");
});