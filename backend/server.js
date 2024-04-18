const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const itemRoute = require("./routes/itemRoute")
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors(
    {
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
    }))
    app.use(session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
    }))
    app.use(express.json({ limit: "1000mb", extended: true }));
    mongoose.connect('mongodb+srv://artenioselami40:artenio123@cluster0.uck4tjh.mongodb.net/Artenio?retryWrites=true&w=majority&appName=Cluster0')
.then(() =>console.log("DB connected"))
.catch((err) => console.log("Something is wrong", err))

// Therrit router
app.use(itemRouter);

    // Testimi
app.use('/', (req, res) => {
    res.send("Hello Node!")
    })
    // Server
app.listen(5000, () => {
    console.log("Server created!")})


